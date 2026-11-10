import { json } from "./_lib.js";
/* The publishable key is public by design; the page needs it to load Clerk. */
export function GET() {
  return json({ publishableKey: process.env.CLERK_PUBLISHABLE_KEY || "" });
}
