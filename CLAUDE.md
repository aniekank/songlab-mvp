# SongLab OS Claude Code Handoff

## Project

SongLab OS is a local web app for producers, songwriters, artists, and engineers. It teaches songwriting and record-making through genre workflows, producer playbooks, case studies, audio tools, writing flows, and AI-assisted analysis.

The current product direction is: make it sleek, uncluttered, audio/workflow driven, genre-aware, and honest about what features actually do.

## How To Run

```bash
npm start
```

Default URL:

```text
http://127.0.0.1:4181/index.html
```

The current Codex preview has been running on:

```bash
PORT=4192 npm start
```

Use the same command if port `4181` is occupied.

## Checks

Run this after edits:

```bash
npm run check
```

This checks JavaScript syntax for `server.mjs` and `app.js`.

## Files

- `index.html`: App shell, navigation, views, controls, global audio markup.
- `styles.css`: Full visual system and responsive layout.
- `app.js`: Most app data, state, workflows, renderers, audio handling, AI analysis UI, pro playbooks, genre data.
- `server.mjs`: Local static server plus AI analysis/transcription endpoints.
- `.env.example`: Required local environment variables.
- `test-suite.html`: Manual product test suite.
- `docs/`: Companion docs.
- `assets/`: Local assets.

## Environment

Current `.env.example`:

```text
OPENAI_API_KEY=
OPENAI_ANALYSIS_MODEL=gpt-4.1-mini
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
PORT=4181
```

Do not commit real API keys.

## Important Product Decisions

- Market Analytics was removed. Do not re-add it unless the user explicitly asks and accepts that real sales/streams/chart data require licensed providers or manual imports.
- Global playback controls are hidden until a beat/audio file is loaded. This is controlled by the `has-global-audio` body class in `updateCreationBeatUI()`.
- Level + Workflow controls live in the rail session panel, not the topbar. Keep the topbar uncluttered.
- The app has four modes: `songwriter`, `producer`, `artist`, `engineer`.
- The genre workflow must meaningfully change content and routing. Do not let all genres show the same producer set or competencies.
- Keep language creative and product-native. Avoid terms like "boilerplate" or "scaffold" in user-facing UI.

## Current Genre To Producer Routing

These mappings were validated end to end:

- `R&B` -> `R&B Architects`
- `Soul` -> `Soul Architects`
- `Neo-Soul` -> `Soul Architects`
- `Pop` -> `Pop Architects`
- `Dance-Pop` -> `Pop Architects`
- `Singer-Songwriter Pop` -> `Pop Architects`
- `Alt-Pop` -> `Alternative & Crossover`
- `Pop-R&B` -> `R&B Architects`
- `Hip-Hop` -> `Hip-Hop Architects`
- `Melodic Rap` -> `Hip-Hop Architects`
- `Drill` -> `Drill Architects`
- `Country` -> `Country Architects`
- `Gospel` -> `Gospel Architects`
- `Alternative` -> `Alt-Rock & Indie Architects`
- `Rock & Roll` -> `Rock Era Architects`
- `Classic Rock` -> `Rock Era Architects`
- `Punk Rock` -> `Rock Era Architects`
- `Grunge` -> `Rock Era Architects`
- `Pop-Punk/Emo` -> `Rock Era Architects`

Gospel should show:

- Kirk Franklin
- Donald Lawrence
- Warryn Campbell
- Fred Hammond

The-Dream belongs under R&B/Pop-R&B, not Gospel.

## Layout Notes

Recent layout cleanup:

- `.rail-session-controls` contains `Level`, `Workflow`, and `Save Session`.
- `.global-player` is hidden with:

```css
body:not(.has-global-audio) .global-player {
  display: none;
}
```

- The save button text is wrapped in a span so compact icon mode centers the SVG correctly.

## AI Analyst

The server supports:

- `/api/health`
- `/api/analyze-song`

The app can do local heuristic analysis without an OpenAI key. Audio transcription requires `OPENAI_API_KEY` with available quota.

If the API returns quota errors, explain that billing/quota belongs to the account owner of the API key.

## Copyright / Content Guardrails

Do not add full copyrighted lyrics. Short lyric excerpts should be avoided unless the user has rights or the use is clearly within a very small quoted limit. The safer product pattern is the current "lyric lens" method:

- identify the writing move
- describe the technique
- explain why it works
- give an original writing prompt

## Design Direction

The user wants:

- sleek
- less cluttered
- more beautiful
- more workflow-driven
- more audio-first
- more genre-specific
- clear distinctions between modes and proficiency levels

Avoid adding large reading-heavy panels unless they are gated, summarized, or tied to an interactive action.

## Common Validation Flow

After meaningful frontend changes:

1. Run `npm run check`.
2. Start or restart local server.
3. Open app in browser.
4. Check console errors.
5. Validate desktop and narrow layouts.
6. Validate each affected app mode and workflow.

For producer routing changes, loop every workflow and verify the active Pro Playbook filter and visible producer names.

