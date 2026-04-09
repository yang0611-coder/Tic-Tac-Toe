# Mouse — History

## Project Context

- **Project:** TicTacToe — human vs. computer tic-tac-toe with neo-brutalist design
- **Owner:** Brady
- **Stack:** Vanilla HTML, CSS, JavaScript (ES modules)
- **Key files:** game.js (engine + minimax AI), app.js (UI controller), index.html, style.css, game.test.js (46 tests)

## Learnings

### 2026-04-09: CodeTour best practices research
- Tours stored in `.tours/` directory at repo root as JSON files
- Use `$schema: "https://aka.ms/codetour-schema"` for validation
- Step types: file+line, file-only, directory, content-only
- Ideal tour length: 8-15 steps. Over 20 loses attention
- Start with context intro, follow execution flow, group related concepts
- Use Markdown in descriptions: bold summaries, code blocks, lists
- Multiple focused tours beat one mega-tour
- Keep tours updated when code changes — stale tours mislead
- Progressive onboarding: overview tour → deep dive tours

### 2026-07-17: First tour created — "How It Works" overview
- Created `.tours/how-it-works.tour` — 13 steps covering the full codebase
- Flow: welcome → HTML → CSS (tokens + grid) → game engine (state, moves, wins, AI) → UI controller (DOM, clicks, scores) → tests → outro
- Content-only steps for intro/outro, file+line for everything else
- Emphasized "why" over "what": immutable state rationale, flat array choice, setTimeout UX delay, animation reflow trick
- Line numbers verified against actual source files
- Tour follows execution flow rather than alphabetical file order — mirrors how a developer would trace the code

## 2026-04-09 Scribe Post-Session

**Merged to decisions.md:** Mouse's CodeTour decision plus Trinity's board and palette decisions added to active decisions log.
**Orchestration log:** Created in `.squad/orchestration-log/2026-04-09T201651Z-mouse.md` (Windows-safe filename).
**Session log:** Work recorded in `.squad/log/2026-04-09T2015-architecture-and-codetour.md`.
**Inbox cleared:** Decision files removed after merge to main decisions file.

**Team updates:**
- Oracle created `ARCHITECTURE.md` with 3 Mermaid diagrams (component, sequence, minimax flow)
- Trinity (via inbox): Documented board grid row collapse fix and neo-brutalist palette change (#FF2ECC pink → #00E5FF cyan)
- Coordinator: Committed all work in commit 33e26b4
