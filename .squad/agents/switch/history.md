# Switch — History

## Project Context

**Project:** TedTacToe — human vs. computer tic-tac-toe with neo-brutalist design
**Stack:** Vanilla HTML, CSS, JavaScript (zero dependencies, ES modules, no bundler)
**Owner:** Brady
**Joined:** 2026-04-09

## Learnings

### 2026-04-09 — Playwright E2E Capture Setup

- **Playwright setup:** `npm install -D @playwright/test serve` + `npx playwright install chromium`. The `playwright` core module is available as a transitive dep of `@playwright/test`.
- **ES modules require HTTP server:** The game uses `<script type="module">` so `file://` won't work. Used `npx serve` on port 3939 as a child process in the capture script.
- **AI move timing:** Computer moves have a 350ms `setTimeout`. Using 800ms wait after each human click reliably captures the AI response.
- **Minimax AI is deterministic:** Move sequences are fully predictable. Verified draw sequence: Human 4→2→3→1→8, AI 0→6→5→7. Loss sequence: Human 0→3→1, AI 4→6→2 (wins via 2-4-6 diagonal).
- **Background color cycles on NEW GAME:** Each reset calls `cycleBgColor()`, giving different backgrounds per game — great for visual variety in screenshots.
- **GIF compression:** The game's solid-color brutalist UI compresses extremely well in GIF format with palettegen. 19 frames at 600x900 = only ~77KB.
- **Key file paths:**
  - Capture script: `e2e/capture-gameplay.js`
  - Screenshots: `e2e/screenshots/screenshot-001.png` through `screenshot-019.png`
  - Animated GIF: `gameplay.gif` (repo root)
  - Game entry: `index.html` → `app.js` (ES module) → `game.js` (pure logic)
- **Selectors:** Cells are `[data-index="0"]` through `[data-index="8"]`. Reset button is `#reset-btn`. Status is `#status`.
