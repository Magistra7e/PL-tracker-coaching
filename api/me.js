import { json, authUser, readLifter, writeLifter } from "./_lib.js";

export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  const data = (await readLifter(user.id)) || { logs: {}, done: {}, videos: {} };
  return json({ user: { email: user.email, name: user.name, isCoach: user.isCoach }, data });
}

/* Save the signed-in lifter's log. Body: {logs, done, videos, mode} */
export async function PUT(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request." }, 400); }
  const clean = (o) => (o && typeof o === "object" && !Array.isArray(o) ? o : {});
  const videos = clean(body.videos);
  /* A lifter may only point at their own uploads. */
  for (const k of Object.keys(videos)) {
    const v = videos[k];
    if (!v || typeof v.path !== "string" || !v.path.startsWith(`videos/${user.id}/`)) delete videos[k];
  }
  const data = {
    email: user.email, name: user.name,
    logs: clean(body.logs), done: clean(body.done), videos,
    mode: body.mode === "coach" ? "coach" : "bodi",
    updatedAt: new Date().toISOString(),
  };
  if (JSON.stringify(data).length > 2_000_000) return json({ error: "Log is too large." }, 413);
  await writeLifter(user.id, data);
  return json({ ok: true, updatedAt: data.updatedAt });
}
