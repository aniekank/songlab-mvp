# SongLab QA Test Plan

This test plan is designed to answer one question: does each stated feature actually work well enough for a songwriter, producer, or artist to trust it?

Use this plan alongside `test-suite.html`, which provides a lightweight automated smoke test.

## Test Environments

Run the app in at least these environments:

- Desktop Chrome or Chromium
- Desktop Safari, if available
- Mobile Safari on iPhone
- Mobile Chrome on Android, if available

Recommended local URL:

```text
http://127.0.0.1:4174/
```

Automated smoke suite:

```text
http://127.0.0.1:4174/test-suite.html
```

## Pass/Fail Levels

Use these labels:

- Pass: works as expected with no confusing behavior.
- Partial: works, but unclear, fragile, awkward, or browser-dependent.
- Fail: does not work or blocks the intended workflow.
- Not supported: depends on browser permission, missing API, blocked embed, or unavailable provider.

## 1. Navigation and Mode Shell

### 1.1 App Loads

Steps:

1. Open `http://127.0.0.1:4174/`.
2. Confirm the sidebar, topbar, app mode buttons, workflow dropdown, and main page render.

Expected:

- No blank screen.
- No console errors.
- App mode buttons show Songwriter, Producer, Artist.
- Main content shows the active mode home.

### 1.2 Global App Mode Switching

Steps:

1. Click Songwriter.
2. Click Producer.
3. Click Artist.

Expected:

- Body mode changes visually.
- Sidebar nav visibility changes by mode.
- Home title changes.
- Default workflow changes when the mode expects it.
- No stuck active states.

### 1.3 View Navigation

Steps:

1. Click each visible nav item.
2. Return to Home.

Expected:

- Only one `.view` section is active at a time.
- Page title updates.
- Hidden views for unavailable modes are not reachable from the visible nav.

## 2. Workflow and Genre Themes

### 2.1 Workflow Dropdown

Steps:

1. Open the workflow dropdown.
2. Select each lane:
   - R&B
   - Neo-Soul
   - Pop-R&B
   - Hip-Hop
   - Melodic Rap
   - Drill
   - Country
   - Gospel
   - Alternative

Expected:

- Mood label updates.
- Visual theme changes clearly.
- Create genre profile changes.
- Shape template changes to a matching structure.
- Pro Playbook filter changes when relevant.

### 2.2 Genre Profile Tabs

Steps:

1. Open Create.
2. Open Start.
3. Click genre profile tabs.
4. Use Load Template.
5. Use Seed Notebook.

Expected:

- Profile content changes.
- Template changes.
- Notebook receives genre prompt material.
- Draft autosaves.

## 3. Create Workflow

### 3.1 Create Route Switching

Steps:

1. Open Create.
2. Click Start, Flow, Record, Write, Shape.

Expected:

- Each route shows only the appropriate panels.
- Layout does not feel cluttered.
- Player stays available where expected.

### 3.2 Beat Upload and Global Playback

Steps:

1. Open Create > Start.
2. Upload a short MP3, WAV, or M4A beat.
3. Use play/pause.
4. Use rewind and fast forward.
5. Toggle loop.
6. Scrub the timeline.

Expected:

- Audio loads.
- Track name updates.
- Playback controls work.
- Timeline updates during playback.
- Loop toggle changes state.

Notes:

- This is manual because automated tests cannot provide a real local audio file without extra setup.

### 3.3 Flow Capture

Steps:

1. Open Create > Flow.
2. Type a phrase.
3. Click Capture.
4. Click Shuffle.
5. Click Send to Pad.
6. Open Create > Write.

Expected:

- Capture appears in list.
- Shuffle changes the prompt.
- Flow material appears in the free-write notebook.

### 3.4 Shape From Flow

Steps:

1. Save at least two flow captures.
2. Click Shape It.

Expected:

- App moves to Shape.
- Section fields receive starter notes.
- Hook/concept may be filled if empty.

### 3.5 Recording Sketches

Steps:

1. Open Create > Record.
2. Click Start Recording.
3. Allow microphone permission.
4. Perform a short sketch.
5. Click Stop Recording.
6. Play back the take.
7. Add or verify transcript text.
8. Click Grade Take.
9. Click Send to Pad.

Expected:

- Browser creates an audio take.
- Playback works.
- Transcript field can hold text.
- Grade appears.
- Transcript moves into notebook.

Known browser-dependent behavior:

- Speech recognition may not run in every browser.
- Microphone permission may be blocked by browser settings.

### 3.5b Vocal Layering and Performance Designer

Steps:

1. Open Create > Record.
2. Choose a section.
3. Choose lead delivery, stack style, harmony density, ad-lib intensity, and emotion.
4. Click Design Take.
5. Review the lead take, layers, and performance cards.
6. Click Send to Pad.
7. Open Create > Write.

Expected:

- Vocal plan appears in the output panel.
- Plan changes when section or stack settings change.
- Delivery notes receive the vocal plan.
- Free-write notebook receives the vocal plan.
- Plan is genre-aware enough to mention the active lane's priorities.

### 3.6 Notebook and Lyric Assistant

Steps:

1. Open Create > Write.
2. Enter title, key/tempo, concept, and hook target.
3. Choose lyric assistant section and tone.
4. Click Suggest Lines.
5. Click Send to Pad.
6. Click Save Draft.
7. Refresh the page.

Expected:

- Suggestions appear.
- Output is clearly labeled as rough starter material.
- The sent-to-pad block reminds the user to rewrite the language in their own voice.
- Free-write page receives the assistant block.
- Draft persists after refresh.

Known limitation:

- The lyric assistant is local and heuristic. It is not a live LLM call yet.

### 3.7 Bar Structure and Timing

Steps:

1. Open Create > Shape.
2. Change BPM.
3. Change section bar counts.
4. Fill section notes.
5. Switch templates.

Expected:

- Total bars update.
- Estimated duration changes.
- Timeline widths change.
- Section notes save.
- Template switch updates section list.

## 4. Audio Lab

### 4.1 Load Demo Groove

Steps:

1. Switch to Producer or Artist mode.
2. Open Audio Lab.
3. Click Load Demo Groove.
4. Play/pause.
5. Use rewind and fast forward.

Expected:

- Demo groove loads.
- Waveform appears.
- BPM estimate appears in the track readout.
- Playback controls work.

### 4.2 Markers and Looping

Steps:

1. Load audio.
2. Add marker label and time.
3. Click Add Marker.
4. Click marker Loop.
5. Delete marker.

Expected:

- Marker list updates.
- Loop start/end fields reflect marker loop.
- Delete removes marker.

### 4.3 Save or Send Audio Map

Steps:

1. Add two markers.
2. Click Save Audio Map.
3. Click Send to Doctor.
4. Open Song Doctor.

Expected:

- Vault receives audio map.
- Doctor fields receive relevant production notes.

## 5. Pro Playbook and Streaming References

### 5.1 Pro Filtering

Steps:

1. Open Pro Playbook.
2. Select each filter.
3. Select several pro cards.

Expected:

- List updates by category.
- Detail panel changes.
- Pro method and suggested records update.

### 5.2 Streaming References

Steps:

1. Open a pro detail.
2. Scroll to streaming references.
3. Test embedded player.
4. Test external streaming link.
5. Save a reference to the vault.

Expected:

- YouTube references use `youtube-nocookie.com` embed URLs.
- If embed is blocked, external link is available.
- Every suggested record card has provider actions for YouTube, Spotify, Apple Music, and SoundCloud.
- Cards without curated direct URLs show `Streaming links`, not a broken/missing-player state.
- Vault save works.

Known limitation:

- YouTube or streaming embeds may be blocked by video owner settings, browser privacy policy, local file origin, or provider restrictions.

## 6. Case Studies

Steps:

1. Open Case Studies.
2. Filter cases.
3. Select several case cards.
4. Save a case.
5. Open related pro playbook.

Expected:

- Case details update.
- Save to vault works.
- Open pro playbook navigates correctly.

## 7. Workshop

Steps:

1. Switch to Songwriter mode.
2. Open Workshop.
3. Click through lesson steps.
4. Answer checkpoint choices.

Expected:

- Lesson content changes.
- Answer selection updates rationale.
- No layout break on long copy.

## 8. Song Doctor

Steps:

1. Open Song Doctor.
2. Fill enough fields to describe a song problem.
3. Submit diagnosis.

Expected:

- Diagnosis output appears.
- Feedback addresses concept, hook, lyric, structure, and production.
- Result can guide next action.
- Pillar cards show concept, hook, vocal space, and payoff scores.
- Repair path buttons open the correct workflow areas.

## 9. Hook Sprint

Steps:

1. Switch to Songwriter mode.
2. Open Hook Sprint.
3. Enter hook seed data.
4. Generate hook options.
5. Score options.
6. Save hook brief.

Expected:

- Hook options render.
- Score buttons update.
- Save to vault works.

## 10. Glossary

Steps:

1. Open Glossary.
2. Search `hook`.
3. Search `pocket`.
4. Use category filters.

Expected:

- Results narrow.
- Definitions remain readable.
- Empty search state is clear.

## 11. Reference Vault

Steps:

1. Add a manual reference.
2. Save items from Create, Audio Lab, Pro Playbook, Case Studies, and Hook Sprint.
3. Refresh.

Expected:

- Vault items persist locally.
- Item labels are understandable.
- Newest entries are visible.

## 12. Responsive Layout

Test viewports:

- 1280 x 720
- 1024 x 768
- 390 x 844
- 360 x 740

Expected:

- No incoherent overlap.
- Sidebar/mobile nav remains usable.
- Create route panels stack cleanly.
- Flow deck does not sit awkwardly beside the writing pad on small screens.
- Global player does not dominate the viewport.

## 13. Accessibility Checks

Minimum checks:

- Keyboard can reach nav buttons, mode buttons, workflow dropdown, forms, and main actions.
- Focus ring is visible.
- Buttons have understandable text or aria-labels.
- Color contrast remains readable in all genre themes.
- Reduced motion setting does not create broken transitions.

## 14. Known Risk Register

High risk:

- Recording and transcription are browser/permission dependent.
- Streaming embeds may be blocked.
- Static local persistence can be lost if browser storage is cleared.
- Lyric assistant is not true external AI yet.

Medium risk:

- Long-generated content can crowd panels.
- Some advanced workflows are heuristic rather than model-backed.
- Audio lab has basic waveform/marker logic, not professional DAW analysis.

Low risk:

- Theme switching may need further contrast tuning.
- Some feature copy may still be denser than ideal.
