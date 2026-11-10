import { json, authUser, listLifterIds, readLifter, summarize } from "./_lib.js";

/* Coach only: everyone using the tracker, with a progress summary. */
export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  if (!user.isCoach) return json({ error: "Coach access only." }, 403);
  const ids = await listLifterIds();
  const rows = await Promise.all(ids.map(async (id) => {
    const d = await readLifter(id).catch(() => null);
    return d ? summarize(id, d) : null;
  }));
  return json({ lifters: rows.filter(Boolean).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))) });
}
