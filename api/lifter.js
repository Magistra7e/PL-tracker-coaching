import { json, authUser, readLifter, safeId } from "./_lib.js";

/* Coach only: one lifter's full log. */
export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  if (!user.isCoach) return json({ error: "Coach access only." }, 403);
  const id = safeId(new URL(request.url).searchParams.get("id") || "");
  const d = id && (await readLifter(id));
  if (!d) return json({ error: "Lifter not found." }, 404);
  return json({ id, data: d });
}
