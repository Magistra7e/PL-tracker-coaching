import { json, authUser, readLifter, safeId, progLog, getPlates } from "./_lib.js";
import { getProgram, programIdFor } from "./_programs.js";

/* Coach only: one lifter's log on their assigned program, with the program itself. */
export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  if (!user.isCoach) return json({ error: "Coach access only." }, 403);
  const id = safeId(new URL(request.url).searchParams.get("id") || "");
  const d = id && (await readLifter(id));
  if (!d) return json({ error: "Lifter not found." }, 404);
  const pid = await programIdFor(id);
  return json({ id, name: d.name, email: d.email, updatedAt: d.updatedAt, programId: pid, program: await getProgram(pid), log: progLog(d, pid), profile: d.profile || {}, plates: await getPlates() });
}
