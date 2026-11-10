/* Shared server helpers: Clerk session check, coach check, Blob storage. */
import { put, get, list, issueSignedToken, presignUrl } from "@vercel/blob";

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

/* ---------- Clerk ---------- */
function frontendApi() {
  const pk = process.env.CLERK_PUBLISHABLE_KEY || "";
  const enc = pk.replace(/^pk_(test|live)_/, "");
  try {
    return Buffer.from(enc, "base64").toString("utf8").replace(/\$$/, "");
  } catch {
    return "";
  }
}

let jwksCache = { at: 0, keys: [] };
async function jwks() {
  if (Date.now() - jwksCache.at < 10 * 60 * 1000 && jwksCache.keys.length) return jwksCache.keys;
  const host = frontendApi();
  if (!host) throw new Error("CLERK_PUBLISHABLE_KEY is not set");
  const r = await fetch(`https://${host}/.well-known/jwks.json`);
  if (!r.ok) throw new Error("Could not load Clerk keys");
  const { keys } = await r.json();
  jwksCache = { at: Date.now(), keys };
  return keys;
}

function b64urlBytes(s) {
  return new Uint8Array(Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64"));
}

async function verifyClerkToken(token) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const header = JSON.parse(Buffer.from(b64urlBytes(parts[0])).toString("utf8"));
  const payload = JSON.parse(Buffer.from(b64urlBytes(parts[1])).toString("utf8"));
  if (header.alg !== "RS256") return null;
  const jwk = (await jwks()).find((k) => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey(
    "jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]
  );
  const ok = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5", key, b64urlBytes(parts[2]),
    new TextEncoder().encode(parts[0] + "." + parts[1])
  );
  if (!ok) return null;
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now > payload.exp + 30) return null;
  if (payload.nbf && now < payload.nbf - 30) return null;
  if (!payload.sub) return null;
  return payload;
}

const userCache = new Map();
async function clerkUser(id) {
  const hit = userCache.get(id);
  if (hit && Date.now() - hit.at < 10 * 60 * 1000) return hit.user;
  const r = await fetch(`https://api.clerk.com/v1/users/${encodeURIComponent(id)}`, {
    headers: { authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
  });
  if (!r.ok) throw new Error("Could not load Clerk user");
  const u = await r.json();
  const primary = (u.email_addresses || []).find((e) => e.id === u.primary_email_address_id) || (u.email_addresses || [])[0];
  const user = {
    id,
    email: (primary && primary.email_address || "").toLowerCase(),
    name: [u.first_name, u.last_name].filter(Boolean).join(" "),
  };
  userCache.set(id, { at: Date.now(), user });
  return user;
}

export function coachEmails() {
  return (process.env.COACH_EMAILS || "")
    .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

/* Returns {id, email, name, isCoach} or null. */
export async function authUser(request) {
  const h = request.headers.get("authorization") || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!token) return null;
  const claims = await verifyClerkToken(token).catch(() => null);
  if (!claims) return null;
  const user = await clerkUser(claims.sub);
  return { ...user, isCoach: !!user.email && coachEmails().includes(user.email) };
}

/* ---------- Blob storage (private store) ---------- */
export const safeId = (id) => String(id).replace(/[^a-zA-Z0-9_-]/g, "");
const lifterPath = (id) => `lifters/${safeId(id)}.json`;

export async function readLifter(id) {
  const r = await get(lifterPath(id), { access: "private", useCache: false }).catch(() => null);
  if (!r || r.statusCode !== 200 || !r.stream) return null;
  return JSON.parse(await new Response(r.stream).text());
}

export async function writeLifter(id, data) {
  await put(lifterPath(id), JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function listLifterIds() {
  const ids = [];
  let cursor;
  do {
    const page = await list({ prefix: "lifters/", cursor, limit: 1000 });
    for (const b of page.blobs) {
      const m = /^lifters\/(.+)\.json$/.exec(b.pathname);
      if (m) ids.push(m[1]);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return ids;
}

export async function signedGetUrl(pathname, minutes = 60) {
  const token = await issueSignedToken({
    pathname, operations: ["get"], validUntil: Date.now() + minutes * 60 * 1000,
  });
  const { presignedUrl } = await presignUrl(token, {
    operation: "get", pathname, access: "private",
    validUntil: Date.now() + minutes * 60 * 1000,
  });
  return presignedUrl;
}

export const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
export const VIDEO_TYPES = { mp4: "video/mp4", mov: "video/quicktime", webm: "video/webm", m4v: "video/x-m4v" };

export async function signedPutUrl(pathname, contentType) {
  const opts = {
    allowedContentTypes: [contentType],
    maximumSizeInBytes: MAX_VIDEO_BYTES,
  };
  const token = await issueSignedToken({
    pathname, operations: ["put"], validUntil: Date.now() + 30 * 60 * 1000, ...opts,
  });
  const { presignedUrl } = await presignUrl(token, {
    operation: "put", pathname, access: "private",
    addRandomSuffix: false, allowOverwrite: false,
    validUntil: Date.now() + 30 * 60 * 1000, ...opts,
  });
  return presignedUrl;
}

/* Summary the coach dashboard shows for each lifter. */
export function summarize(id, d) {
  const logs = d.logs || {}, done = d.done || {}, videos = d.videos || {};
  const daysDone = Object.keys(done).filter((k) => done[k]).length;
  let week = 0;
  Object.keys(logs).concat(Object.keys(done)).forEach((k) => {
    const w = parseInt(k, 10);
    if (w > week) week = w;
  });
  return {
    id, email: d.email || "", name: d.name || d.email || "Lifter",
    updatedAt: d.updatedAt || null, daysDone, week, videos: Object.keys(videos).length,
    mode: d.mode || "bodi",
  };
}
