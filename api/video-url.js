import { json, authUser, signedGetUrl } from "./_lib.js";

/* Playback URL for one video. Lifters get their own; coaches get anyone's. */
export async function GET(request) {
  const user = await authUser(request);
  if (!user) return json({ error: "Sign in first." }, 401);
  const p = new URL(request.url).searchParams.get("p") || "";
  if (!/^videos\/[A-Za-z0-9_-]+\/[A-Za-z0-9._-]+$/.test(p)) return json({ error: "Bad video." }, 400);
  if (!user.isCoach && !p.startsWith(`videos/${user.id}/`)) return json({ error: "Not your video." }, 403);
  return json({ url: await signedGetUrl(p, 120) });
}
