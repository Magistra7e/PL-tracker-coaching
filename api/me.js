import { json, authUser, readLifter, writeLifter, progLog } from "./_lib.js";
import { programIdFor } from "./_programs.js";

export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  const pid = await programIdFor(user.id);
  const d = await readLifter(user.id);
  return json({ user: { email: user.email, name: user.name, isCoach: user.isCoach }, programId: pid, data: progLog(d, pid), profile: (d && d.profile) || {} });
}

/* Save the signed-in lifter's log for their current program. Body: {logs, done, videos, mode} */
export async function PUT(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request." }, 400); }
  const clean = (o) => (o && typeof o === "object" && !Array.isArray(o) ? o : {});
  const videos = clean(body.videos);
  for (const k of Object.keys(videos)) {
    const v = videos[k];
    if (!v || typeof v.path !== "string" || !v.path.startsWith(`videos/${user.id}/`)) delete videos[k];
  }
  const pid = await programIdFor(user.id);
  const prev = (await readLifter(user.id)) || {};
  const byProgram = Object.assign({}, prev.byProgram || {});
  if (!byProgram.showdown && (prev.logs || prev.done)) byProgram.showdown = { logs: prev.logs || {}, done: prev.done || {}, videos: prev.videos || {}, mode: prev.mode };
  byProgram[pid] = { logs: clean(body.logs), done: clean(body.done), videos, mode: body.mode === "coach" ? "coach" : "bodi" };
  const data = { email: user.email, name: user.name, byProgram, profile: cleanProfile(body.profile, prev.profile), updatedAt: new Date().toISOString() };
  if (JSON.stringify(data).length > 4_000_000) return json({ error: "Log is too large." }, 413);
  await writeLifter(user.id, data);
  return json({ ok: true, updatedAt: data.updatedAt });
}

/* Unit and squat/bench/deadlift maxes. Unknown fields are dropped. */
function cleanProfile(p, prev) {
  if (!p || typeof p !== "object") return prev || {};
  const unit = p.unit === "kg" ? "kg" : "lb";
  const maxes = {};
  ["squat", "bench", "deadlift"].forEach((k) => {
    const n = parseFloat(p.maxes && p.maxes[k]);
    if (n > 0 && n < 2000) maxes[k] = Math.round(n * 100) / 100;
  });
  return { unit, maxes };
}
