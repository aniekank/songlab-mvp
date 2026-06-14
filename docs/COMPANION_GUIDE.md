# SongLab Companion Guide

SongLab is a browser-based songwriting and production training app for producer-first creators. Its purpose is to help a user move from a beat, loop, or rough vocal instinct into a more complete song: concept, hook, structure, performance, production decisions, and reference study.

This guide documents the current web app as implemented in `index.html`, `styles.css`, and `app.js`.

## 1. App Model

SongLab is organized around two major navigation layers:

1. Global app mode
2. Workflow or genre lane

The global app mode changes the user's creative role. The workflow lane changes the genre system, default structure, visual theme, prompts, and pro/reference context.

### Global App Modes

#### Songwriter Mode

Primary intent: turn instincts into a song.

Default path:

- Create
- Flow
- Write
- Shape
- Song Doctor
- Hook Sprint
- Case Studies

Best for:

- Concept development
- Hooks
- Lyrics
- Flow capture
- Song structure
- Genre-specific songwriting prompts

#### Producer Mode

Primary intent: turn a beat or loop into a record.

Default path:

- Audio Lab
- Pro Playbook
- Case Studies
- Create
- Reference Vault

Best for:

- Audio playback
- Marker mapping
- Arrangement decisions
- Pro systems study
- Streaming reference analysis
- Production in service of the song

#### Artist Mode

Primary intent: capture and evaluate performance ideas.

Default path:

- Create
- Record
- Write
- Audio Lab
- Song Doctor

Best for:

- Recording sketch takes
- Playing back rough takes
- Transcribing ideas when the browser supports speech recognition
- Performance grading
- Moving take phrases into the notebook

## 2. Genre and Workflow Lanes

The workflow dropdown changes the creative lens of the app. Each lane can alter:

- Body theme and app chrome colors
- Active genre profile
- Suggested song structure
- Flow prompt starting point
- Pro Playbook filter
- Mood label
- Genre-specific prompts and traps

Current lanes:

- R&B
- Neo-Soul
- Pop-R&B
- Hip-Hop
- Melodic Rap
- Drill
- Country
- Gospel
- Alternative

### Expected Behavior

When the user changes the workflow:

- The mood label should update, for example `Drill | cold motion room`.
- The body `data-workflow` value should change.
- The visual palette should become noticeably different.
- The active genre profile in Create should match the chosen lane.
- The Shape workflow should load a suitable structure template.

## 3. Create Section

Create is the core writing room. It is divided into five route cards:

### Start

Purpose:

- Load a beat.
- Pick the genre workflow.
- Review genre profile guidance.

Expected functionality:

- Uploading an audio file loads it into the global creation player.
- Global playback buttons control the uploaded beat.
- Genre profile tabs change the instructional profile.
- `Load Template` applies the selected genre's structure.
- `Seed Notebook` adds genre prompts into the writing notebook.

### Flow

Purpose:

- Capture loose phrases, pockets, images, hooks, and performance instincts without forcing structure too early.

Expected functionality:

- Flow prompt card rotates through phases.
- The user can type a phrase into the capture field.
- `Capture` saves the phrase into the flow capture list.
- `Shuffle` changes the prompt.
- `Send to Pad` moves saved flow captures into the notebook.
- `Shape It` turns captures into starter section notes.

### Record

Purpose:

- Capture vocal sketches directly in the browser.

Expected functionality:

- `Start Recording` asks for microphone permission.
- `Stop Recording` creates a playable take.
- Browser speech recognition may add transcript text when supported.
- Manual transcript text can be added by the user.
- Vocal Designer creates a section-specific lead, stack, harmony, ad-lib, and performance plan.
- Vocal Designer output can be sent into the notebook and delivery notes.
- `Send to Pad` moves transcript text into the notebook.
- `Grade Take` scores the performance based on clarity, repetition, specificity, and performance direction.

Known limitation:

- Recording and transcription depend on browser APIs and permissions. Some desktop browsers may support recording but not speech recognition.

### Write

Purpose:

- Turn the concept, hook target, flow captures, and take notes into a working song draft.

Expected functionality:

- Working title, key/tempo, concept, hook target, and free-write text autosave locally.
- The lyric starter tool generates rough section-specific first-pass ideas.
- The app reminds the user to keep the direction and rewrite the language in their own voice.
- `Suggest Lines` uses the current concept, hook, genre lane, and notebook context.
- `Send to Pad` appends the lyric assistant output into the free-write page.
- `Doctor It` sends the draft into the Song Doctor.
- `Save to Vault` saves the draft as a reference.

Important limitation:

- The lyric assistant is currently a local suggestion engine. It is not connected to a live external AI model yet. A backend/API layer would be needed for true model-generated lyrics.
- Generated lyric starters are direction prompts, not finished lyrics.

### Shape

Purpose:

- Convert song ideas into a bar-based structure.

Expected functionality:

- Template tabs change the section map.
- BPM input changes total duration estimates.
- Each section has a bar count field.
- The bar timeline should update when bar counts or BPM change.
- Section prompts should save locally.
- The coach panel should update as more sections are filled.

## 4. Audio Systems

SongLab currently has two audio areas.

### Global Creation Player

Location:

- Topbar and Create player panel

Purpose:

- Play a user-uploaded beat while writing.

Expected functionality:

- Upload beat.
- Play/pause.
- Rewind 5 seconds.
- Fast forward 5 seconds.
- Toggle loop.
- Scrub timeline.
- Change playback speed in the Create player panel.

### Audio Lab

Purpose:

- Analyze a track, build markers, loop sections, and send production notes to the Song Doctor.

Expected functionality:

- Upload an audio file or load the demo groove.
- Estimate BPM locally from the uploaded beat or demo.
- Play/pause.
- Rewind and fast forward.
- Toggle loop.
- Set loop start/end.
- Click waveform to seek.
- Add markers.
- Loop a marker.
- Delete markers.
- Save an audio map to the vault.
- Send the map to the Song Doctor.

Known limitation:

- The waveform and marker system is local and browser-based. It does not perform stem separation, beat detection, or automatic chord detection yet.
- BPM is an estimate based on onset/energy analysis and may choose half-time or double-time interpretations for some genres.

## 5. Pro Playbook

Purpose:

- Teach producer-songwriter systems through modern record studies and archetypes.

Expected functionality:

- Filter producers by category.
- Select a pro card.
- Read the pro method, superpower, and transferable moves.
- Review suggested streaming references.
- Every suggested record shows streaming provider actions for YouTube, Spotify, Apple Music, and SoundCloud.
- Curated records show embedded players when a direct official URL has been supplied.
- Records without curated direct URLs still provide one-click provider search links so the slot is not dead.
- Save pro moves or references to the vault.
- Load generated pro sketch audio into the Audio Lab.

Known limitations:

- YouTube embeds may fail depending on browser origin, privacy settings, video restrictions, or embedding rules.
- Streaming links are safer and more reliable than direct embedded playback.
- The app should not ship copyrighted audio files unless properly licensed.

## 6. Case Studies

Purpose:

- Study hit-record anatomy through songwriting and production questions.

Each case study is expected to answer:

- Why did this record work?
- What songwriting problem was solved?
- What production problem was solved?
- What made it replayable?
- What can be copied?
- What cannot be copied?

Expected functionality:

- Filter case studies.
- Select a case.
- Review section roles, hook architecture, production lessons, and transfer principles.
- Save a case study to the vault.
- Open the associated pro playbook.

## 7. Workshop

Purpose:

- Teach the mindset and foundations of producer-first songwriting.

Expected functionality:

- Select lesson steps.
- Read compact lesson material.
- Answer checkpoint questions.
- Receive rationale and repair drills.

## 8. Song Doctor

Purpose:

- Diagnose why a song idea is not working.

Expected functionality:

- Enter concept, hook, lyric, structure, and production concerns.
- Submit the diagnosis form.
- Receive a weighted score and classification.
- See the weakest songwriting/production pillar.
- Review pillar cards for concept, hook, vocal space, and payoff.
- Receive rewrite moves and a 15-minute repair prescription.
- Use repair path buttons to jump into Create, Hook Sprint, Audio Lab, Vocal Designer, or Pro Playbook.

The Song Doctor is currently heuristic. It is useful for structured feedback and workflow routing, but it is not yet listening to audio or using a live AI model.

## 9. Hook Sprint

Purpose:

- Generate and score hook directions.

Expected functionality:

- Generate hook options from a seed idea.
- Score options.
- Save a hook brief.

## 10. Glossary

Purpose:

- Explain music and songwriting language for users who do not know the terms yet.

Expected functionality:

- Search glossary terms.
- Filter categories.
- Read definitions, listening cues, and reasons each term matters.

## 11. Reference Vault

Purpose:

- Store useful song ideas, case notes, references, audio maps, drafts, and hook briefs locally.

Expected functionality:

- Add a manual reference.
- Save items from other app sections.
- Persist references through `localStorage`.

Known limitation:

- The vault is local to the browser. It is not cloud synced.

## 12. Current Technical Architecture

SongLab is currently a static single-page app:

- `index.html`: app markup and SVG icons
- `styles.css`: visual system, layout, responsive behavior, theme switching
- `app.js`: app state, data, rendering, local persistence, playback, recording, diagnostics, and interaction handlers
- `assets/studio-case-study.png`: visual asset

Persistence is local:

- App mode: `songlabAppMode`
- Creation draft: `songlabCreationDraft`
- Flow state: `songlabFlowState`
- Reference vault: `songlabReferences`
- Streaming references: `songlabStreamRefs`
- Audio maps: `songlabAudioMaps`

There is no backend yet.

## 13. Features That Need Future Hardening

Highest priority:

- Real AI upgrade for the lyric starter tool through a backend/API key flow
- Reliable user project saving/export
- More robust audio session persistence
- Better mobile audio and recording QA
- Full accessibility pass
- Real automated browser tests in CI

Medium priority:

- Streaming provider fallback UI
- Better failure states when embeds are blocked
- Download/export for notebook, song blueprint, and audio map
- More explicit onboarding gates
- Cloud sync or local file export/import

Advanced future features:

- AI performance take grader using transcript plus audio features
- Beat/chord/key/BPM detection
- Stem-aware arrangement analysis
- Collaborative writing sessions
- Project timeline with version history
