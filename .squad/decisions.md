# Squad Decisions

## Active Decisions

### 2026-04-09T19:08:00Z: Diagram styling directive
**By:** Brady (via Copilot)
**What:** All Mermaid diagrams must use dark backgrounds with white font.
**Why:** User request — captured for team memory

### 2026-04-09 (Morpheus): Game Engine API Contract
**Status:** Implemented
- All game state flows through immutable state objects: `{ board, currentPlayer, gameOver, winner }`
- Minimax is fully optimal (unbeatable) — verified via exhaustive game-tree traversal
- `makeMove` returns `null` for invalid moves rather than throwing
- `getComputerMove` exposed separately from `makeComputerMove` for UI animation flexibility
- ES module exports only; no default export, no CommonJS

### 2025-07-16 (Tank): Test Strategy for Game Engine
**Status:** Implemented
- Use Node.js built-in test runner (`node:test`) with `node:assert/strict`
- Draw state: `state.winner` stores `'draw'` (not `null`)
- Board helpers: Use `boardFrom('XO_X__O__')` pattern for tests
- Exhaustive AI test: Every test run verifies AI never loses (~194ms)
- Run command: `node --test game.test.js`

### 2026-04-09 (Trinity): UI Design System — Neo-Brutalist TicTacToe
**Status:** Implemented
- Hero color: Electric yellow `#FFE600` background
- Mark colors: X = blue `#1A1AFF`, O = hot pink `#FF2D55`
- Winning highlight: Pulsing green `#00FF88`
- Borders: 4-6px solid black, sharp corners, no border-radius
- Shadows: Hard offset `8px 8px 0 #000`, no blur
- Typography: Arial Black / Impact for display, Courier New / Consolas for marks
- Board: CSS Grid, `<button>` elements, aspect-ratio locked square
- Animations: Pop-in marks, pulse wins, bump score, shadow-press buttons

### 2026-04-09 (Oracle): ARCHITECTURE.md added at repo root
**Status:** Implemented
- Created `ARCHITECTURE.md` at the repository root containing project overview and three Mermaid diagrams
- Diagrams: component architecture (graph TD), game turn flow (sequence), minimax AI flow (graph TD)
- Includes component descriptions for all five source files and tech stack documentation
- Serves as onboarding material and living system map
- All diagrams follow dark theme standard

### 2025-07-15 (Trinity): Fix Board Grid Row Collapse
**Status:** Implemented
- Added `grid-template-rows: repeat(3, 1fr)` to `.board` — forces all three rows to equal height
- Added `aspect-ratio: 1` to `.cell` — ensures each cell stays square
- Problem: Empty rows were collapsing due to CSS Grid auto-sizing based on content
- Solution: Explicit row template is the correct CSS Grid approach

### 2025-07-15 (Trinity): Replaced Yellow with Hot Pink Neo-Brutalist Palette
**Status:** Implemented
- `--color-bg`: `#FFE600` (yellow) → `#FF2ECC` (hot pink/magenta)
- `--color-accent`: `#FF2D55` (red-pink) → `#00E5FF` (electric cyan)
- X marks stay blue `#1A1AFF`, O marks stay red-pink `#FF2D55`, win highlight stays green `#00FF88`
- Hot pink/magenta is the defining neo-brutalist color — bold, high-energy, maintains raw aesthetic

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
