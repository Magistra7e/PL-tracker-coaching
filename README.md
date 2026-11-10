# Showdown Prep Tracker

12-week meet-prep tracker: main lifts from the Showdown program plus BODi accessory swaps, with weight logging and lift videos. Lifters sign in with an email link; coaches see every lifter on `/coach`.

Live site: https://showdown-prep-tracker.vercel.app (auto-deploys from `main`).

## How it works
- `index.html`: the lifter's tracker. `coach.html`: the coach dashboard. `auth.js`: Clerk sign-in shared by both.
- `api/`: Vercel Functions. Lifter logs are JSON files and videos are uploaded straight from the phone, both in a **private** Vercel Blob store. Program content (`api/_program.js`) is only served to signed-in users.

## Settings (Vercel → Settings → Environment Variables)
| Variable | What it is |
| --- | --- |
| `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | From Clerk → API keys |
| `COACH_EMAILS` | Comma-separated emails that get the coach dashboard |
| `BLOB_READ_WRITE_TOKEN` | Added automatically by the connected Blob store |
