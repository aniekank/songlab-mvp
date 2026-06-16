# SongLab

A songwriting-craft platform that teaches record-making through producer playbooks, genre workflows, audio tools, and AI-assisted song analysis. Built to **augment creativity, not replace it**: you study a real producer's move, learn why it works, then write your own version. The app deliberately will not write your lyric for you.

**Live demo:** https://songlab-mvp.onrender.com (runs in keyless safe mode, so AI analysis falls back to a local heuristic and no billing can occur from public traffic). Confirm it is safe at `/api/health`, which returns `"apiEnabled": false` on the public deploy.

> Built and shipped solo, end to end: front end, server, and the AI integration.

## What it does

- **Pro Playbook (the craft loop):** study a producer's signature move, see why it works and what you cannot copy, then write your own version and save it to your Vault.
- **Adaptive workspace:** the whole app re-skins and re-scopes itself across three independent dimensions, Mode (songwriter / producer / artist / engineer), skill Level, and Genre.
- **Writing Room:** record rough vocal takes in the browser with a live level meter and live speech-to-text transcription, then shape captures into a finished song.
- **AI Song Analyst:** transcribe, map, score, and get repair notes under a strict JSON schema, with a deterministic local fallback when no API key is set.
- **Learning surfaces:** hit case studies, session greats, a glossary, and genre-aware writing flows.

## Architecture

A deliberately simple, dependency-light design:

- **No framework, no build step.** The front end is vanilla JavaScript. Views are rendered by building HTML strings from a single in-memory `state` object and assigning them to the DOM. The mental model: state is the source of truth, the page is a projection of it.
- **CSS custom properties drive all theming.** Mode, Level, and Genre are written onto `<body>` as data attributes; components read tokens like `var(--mode-b)`, so changing one attribute re-themes the entire Mode x Level x Genre matrix with no duplicated components.
- **Progressive disclosure.** Rooms unlock by skill level through a small config (`viewMinLevel`), so a beginner sees a focused app that grows with them. Navigation visibility is owned by JavaScript as the single source of truth.
- **Thin Node server (standard library only).** `server.mjs` serves static files behind a path-traversal guard and exposes two routes.
- **AI with graceful degradation.** `POST /api/analyze-song` uses OpenAI transcription plus a structured-JSON analysis when a key is present, and falls back to a deterministic local heuristic analyzer when it is not. Both paths return the same response shape, so the front end never branches. This is what makes the public demo zero-cost and abuse-safe.

## Tech stack

Vanilla JavaScript, HTML, CSS (custom-property design system), Node.js (`node:http`), the OpenAI API (optional), and browser-native Web Audio, MediaRecorder, and the Web Speech API for in-browser capture and transcription. No bundler, no runtime dependencies.

## Run locally

```bash
npm start
# http://127.0.0.1:4181/index.html
```

AI features are optional. To enable them, copy `.env.example` to `.env` and add an OpenAI key:

```bash
cp .env.example .env
# set OPENAI_API_KEY=...   (never commit this file; it is gitignored)
```

Without a key, the app runs fully on the local heuristic analyzer. Syntax check after edits:

```bash
npm run check
```

## Project structure

| File | Role |
|---|---|
| `index.html` | App shell, navigation, view sections, SVG icon sprite |
| `app.js` | State, content datasets, renderers, audio capture, AI analysis UI |
| `styles.css` | Design-token system and responsive layout (Mode / Genre / Level theming) |
| `server.mjs` | Static server plus the analysis and health endpoints |
| `render.yaml` | Render blueprint (deploys in keyless safe mode) |
| `DEPLOY.md` | Deployment guide |
| `test-suite.html` / `TESTER_GUIDE.md` | Manual test suite and tester guide |

## API

| Route | Behavior |
|---|---|
| `GET /api/health` | Returns `{ ok, apiEnabled, analysisModel, transcribeModel }` |
| `POST /api/analyze-song` | Transcribes audio (if keyed), analyzes under a strict JSON schema, or falls back to the local heuristic analyzer. Copyright-aware, with an ownership guard. |

## Status

v1.0 MVP: live in production on the keyless safe-mode deploy. Content lives in curated in-code datasets; all user state persists in the browser via `localStorage`. Built as a craft tool first, with the AI kept honest about what it actually does.
