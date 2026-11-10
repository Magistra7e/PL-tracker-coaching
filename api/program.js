import { json, authUser } from "./_lib.js";
import { PROGRAM } from "./_program.js";
export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  return json(PROGRAM);
}
