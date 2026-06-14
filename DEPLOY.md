# Deploying the SongLab MVP (public, no-key demo)

This deploys the app publicly in **safe mode**: no OpenAI key, so public visitors
cannot spend your money. AI transcription/analysis falls back to local heuristics;
everything else works fully.

## Safety check (already handled)

- `.env` (your real OpenAI key) is in `.gitignore` and will NOT be committed.
- `render.yaml` deliberately sets no `OPENAI_API_KEY`.
- Never add the real key to a public host.

## Option A — Render via GitHub (recommended)

1. Create a new, empty repo on https://github.com/new (e.g. `songlab-mvp`). Do not
   add a README/license (this repo already has files).
2. In this folder, connect and push:
   ```bash
   git remote add origin https://github.com/<you>/songlab-mvp.git
   git push -u origin main
   ```
3. Go to https://render.com → New → Blueprint → pick the repo. Render reads
   `render.yaml` and deploys. (Or New → Web Service → Node → start command `npm start`.)
4. You get a public URL like `https://songlab-mvp.onrender.com`.

Note: Render's free tier sleeps after inactivity, so the first visit can take
~30–50s to wake. Fine for a demo.

## Option B — Railway / Glitch

- Railway: `npm i -g @railway/cli` → `railway login` → `railway up` (deploys this
  folder directly, no GitHub needed). Leave `OPENAI_API_KEY` unset.
- Glitch: glitch.com → New Project → Import from GitHub.

## Confirming it's safe after deploy

Visit `https://<your-url>/api/health` — it should return `"apiEnabled": false`.
That confirms no key is active and no billing can happen.
