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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
