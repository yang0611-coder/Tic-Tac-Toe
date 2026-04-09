# Project Context

- **Owner:** Brady
- **Project:** TicTacToe — a human-versus-computer tic-tac-toe game with neo-brutalist design
- **Stack:** Vanilla HTML, CSS, JavaScript
- **Created:** 2026-04-09

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- **game.js** lives at project root — pure ES module, zero DOM dependencies.
- Board is a flat 9-element array (indices 0-8, left-to-right, top-to-bottom).
- Minimax mutates a local copy during recursion for performance but the public API always returns new state objects (immutable from the caller's perspective).
- AI is provably unbeatable: exhaustive game-tree simulation confirms 0 losses across all possible human move sequences.
- WIN_LINES constant holds the 8 winning combinations — rows, columns, diagonals.
- API surface: createGame, makeMove, getComputerMove, makeComputerMove, checkWinner, isValidMove, plus constants HUMAN/COMPUTER/EMPTY.

## 2026-04-09 Team Update (Scribe)

**Decisions archive:** Game Engine API Contract decision recorded in `.squad/decisions.md` for team reference.
**Orchestration log:** Work completed and logged in `.squad/orchestration-log/2026-04-09T19-16-47Z-morpheus.md` — Game engine DONE, AI verified unbeaten.
