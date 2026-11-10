import { json, authUser, listLifterIds, readLifter, summarize } from "./_lib.js";
import { getIndex, getAssignments } from "./_programs.js";

/* Coach only: everyone using the tracker, with progress on their assigned program. */
export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  if (!user.isCoach) return json({ error: "Coach access only." }, 403);
  const [ids, idx, asg] = await Promise.all([listLifterIds(), getIndex(), getAssignments()]);
  const valid = new Set(idx.programs.map((p) => p.id));
  const rows = await Promise.all(ids.map(async (id) => {
    const d = await readLifter(id).catch(() => null);
    const pid = valid.has(asg[id]) ? asg[id] : idx.defaultId;
    return d ? summarize(id, d, pid) : null;
  }));
  return json({
    lifters: rows.filter(Boolean).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))),
    programs: idx.programs, defaultId: idx.defaultId,
  });
}
