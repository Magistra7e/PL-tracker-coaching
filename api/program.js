import { json, authUser } from "./_lib.js";
import { getProgram, programIdFor } from "./_programs.js";
import { PROGRAM } from "./_program.js";

/* The signed-in lifter's assigned program. BODi swaps only exist for Showdown. */
export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  const pid = await programIdFor(user.id);
  const program = await getProgram(pid);
  if (!program) return json({ error: "Program not found." }, 404);
  return json({ program, bodi: pid === "showdown" ? { phases: PROGRAM.phases, orig: PROGRAM.orig } : null });
}
