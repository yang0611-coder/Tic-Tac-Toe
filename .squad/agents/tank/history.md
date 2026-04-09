# Project Context

- **Owner:** Brady
- **Project:** TicTacToe — a human-versus-computer tic-tac-toe game with neo-brutalist design
- **Stack:** Vanilla HTML, CSS, JavaScript
- **Created:** 2026-04-09

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- **Test file:** `game.test.js` at project root, uses Node.js built-in test runner (`node:test`) and `node:assert/strict`
- **Run command:** `node --test game.test.js`
- **Coverage:** 46 tests across 10 suites — constants, createGame, makeMove, checkWinner, isValidMove, getComputerMove, makeComputerMove, state immutability, edge cases, exhaustive AI verification
- **Key pattern:** `boardFrom()` helper converts 9-char strings like `'XO_X__O__'` to board arrays for readable test setup
- **Draw convention:** `state.winner` is `'draw'` (not `null`) when the game ends in a draw — matches `checkWinner()` return value
- **AI exhaustive test:** Recursively plays every possible human move sequence to prove AI never loses (~194ms runtime)
- **TDD approach:** Tests written before `game.js` implementation exists; they import from `./game.js`

## 2026-04-09 Team Update (Scribe)

**Decisions archive:** Test Strategy decision recorded in `.squad/decisions.md` for team reference.
**Orchestration log:** Work completed and logged in `.squad/orchestration-log/2026-04-09T19-16-47Z-tank.md` — Test suite DONE, all 46 tests passing, AI exhaustively verified.
