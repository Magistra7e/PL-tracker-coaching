import { json, authUser, safeId, signedPutUrl, VIDEO_TYPES, MAX_VIDEO_BYTES } from "./_lib.js";

/* Returns a short-lived URL the phone uploads the video to directly. Body: {key, ext, size} */
export async function POST(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  const { key, ext, size } = await request.json().catch(() => ({}));
  const e = String(ext || "mp4").toLowerCase();
  const type = VIDEO_TYPES[e];
  if (!type) return json({ error: "Use an MP4 or MOV video." }, 400);
  if (size && size > MAX_VIDEO_BYTES) return json({ error: "Videos can be up to 500 MB. Trim it to just the lift." }, 413);
  const slot = String(key || "").replace(/[^0-9A-Za-z|_-]/g, "").replace(/\|/g, "-").slice(0, 60) || "lift";
  const rand = Math.random().toString(36).slice(2, 10);
  const path = `videos/${safeId(user.id)}/${slot}-${Date.now()}-${rand}.${e}`;
  try {
    const url = await signedPutUrl(path, type);
    return json({ url, path, contentType: type });
  } catch (err) {
    return json({ error: "Upload isn't available right now." }, 500);
  }
}
