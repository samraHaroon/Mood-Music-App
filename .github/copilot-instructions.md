## Mood Music App — Copilot instructions

Purpose
- Help an AI coding assistant quickly become productive in this small static web app.

Big picture (what to know immediately)
- This is a single-page static app: `index.html` loads `style.css` and `script.js`.
- `script.js` owns the app behavior: it (1) acquires the webcam (`navigator.mediaDevices.getUserMedia`), (2) runs a simulated mood detector (a `setInterval` that picks a random mood), (3) updates UI via `updateMood(...)`, (4) plays audio via the `<audio id="audio">` element, and (5) keeps an in-memory mood history.
- There is no build system, backend, or packaging in this repo — serving over HTTP(S) is required for camera access.

How to run / developer workflows
- Because the app uses `getUserMedia`, open it from a secure context (localhost or HTTPS). A fast way on Windows is to run a local static server (from the project root):

  python -m http.server 8000

- Or use the VS Code Live Server extension and open `http://127.0.0.1:5500` (or the port Live Server shows).
- No tests or CI are present; manual testing steps:
  - Open the app in a browser on `http://localhost:<port>`.
  - Allow camera access when prompted.
  - Verify mood changes every 5s (simulated), that the background color changes, and audio plays if the referenced `.mp3` files exist.

Key files and patterns to reference
- `index.html` — DOM IDs that `script.js` expects: `video`, `mood`, `audio`, `mood-history`, `manual-mood`, `override-btn`.
- `script.js` — important symbols and small contract examples:
  - `const moods = ['happy','sad','neutral']` — central source of truth for mood names.
  - `const music = { happy: 'happy.mp3', sad: 'sad.mp3', neutral: 'neutral.mp3' }` — audio mapping; keep keys aligned with `moods` and the `<select>` in HTML.
  - `function updateMood(newMood)` — single entry point when mood changes: it updates the DOM (`moodSpan`), calls `playMusic(newMood)`, appends history, and changes background color. When modifying mood flows, preserve this contract (UI update, audio, history, background).

Project-specific conventions and gotchas
- Mood names are used as keys in multiple places: the `moods` array, the `<select id="manual-mood">` options, and the `music` mapping. If you add a mood, update all three.
- Audio files are referenced by filename only (relative to `index.html`). If an audio file is missing, `audio.play()` will fail silently (or log an error); include assets in the repo or update paths.
- Camera access requires HTTPS/localhost — testing over `file://` will typically fail.
- Mood detection is simulated. If integrating a real model, replace the `setInterval` block and make sure the new detector calls `updateMood(...)` with the same strings.

Debugging tips
- Open DevTools → Console to see permission errors or uncaught exceptions (e.g., webcam denied or missing audio files).
- Check Media Stream: `document.getElementById('video').srcObject` should be a MediaStream when the camera is allowed.
- If audio doesn’t autoplay, user gesture policies may block it — clicking the play control or interacting with the page usually resolves this.

Limits and known missing pieces
- No persistence: `moodHistory` is in-memory only. Add localStorage if persistence is needed.
- No automated tests or linter configuration in the repo.
- No package.json or build; assume pure static files.

When editing: minimal rules
- Keep DOM ID names stable unless you update `index.html` and `script.js` together.
- Keep the `updateMood` contract: UI text, audio playback, history append, background update.
- When adding filenames, prefer placing assets (e.g., `happy.mp3`) in the project root or `assets/` and updating `music` paths accordingly.

If you need more context
- Start by opening `index.html` and `script.js` — the full app behavior is implemented in a few dozen lines. Ask the repo owner for missing assets (the `.mp3` files) or for an intended production deployment (HTTPS domain).

---
If any of the above is unclear or you want the instructions tailored to a different workflow (e.g., add a Node-based dev server or tests), tell me which direction and I'll update this file.
