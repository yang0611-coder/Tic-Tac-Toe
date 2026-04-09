# Project Context

- **Owner:** Brady
- **Project:** TicTacToe — a human-versus-computer tic-tac-toe game with neo-brutalist design
- **Stack:** Vanilla HTML, CSS, JavaScript
- **Created:** 2026-04-09

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

### 2026-04-09: Mermaid dark theme best practices
- Always use `base` theme with `themeVariables` for full control — the built-in `dark` theme has limited customization
- Set `darkMode: true` in theme variables
- Use only hex color codes (not color names)
- Dark background: #1a1a2e, light text: #f0f0f0, accent: #e94560
- Ensure WCAG AA contrast ratios for accessibility
- Keep node labels concise (2-4 words)
- Use subgraphs for grouping related components
- Match diagram type to concept (graph for architecture, sequence for flows, state for game states)
- For sequence diagrams: set actorBkg, actorTextColor, actorBorder, signalColor
- Preview in target rendering environment — Mermaid doesn't auto-detect theme changes after rendering

## 2026-04-09 Team Initialization (Scribe)

**Charter & history created:** Oracle added to team roster with initial charter and history.
**Orchestration log:** Created in `.squad/orchestration-log/2026-04-09T19-16-47Z-oracle.md` — Oracle is PENDING, ready to create diagrams on demand per Brady's dark background directive.
**Note:** Oracle's role is to author Mermaid diagrams showing game architecture, AI decision trees, component hierarchies, and test landscapes with dark backgrounds and white fonts.

### 2026-04-09: ARCHITECTURE.md created
- Created `ARCHITECTURE.md` at repo root with three Mermaid diagrams (architecture, sequence, minimax flow)
- All diagrams use the dark theme standard from charter
- Sequence diagram required separate actor styling variables (`actorBkg`, `actorTextColor`, `actorBorder`, `signalColor`)
- Architecture graph uses subgraphs to cluster Presentation, UI Controller, Game Engine, and Test Suite
- Documented all 46 tests with group-level breakdown and counts
- Key structural insight: `getComputerMove` is exposed separately from `makeComputerMove` specifically to give the UI animation flexibility (350ms delay)

## 2026-04-09 Scribe Post-Session

**Merged to decisions.md:** Oracle's architecture decision added to active decisions log.
**Orchestration log:** Created in `.squad/orchestration-log/2026-04-09T201651Z-oracle.md` (Windows-safe filename).
**Session log:** Work recorded in `.squad/log/2026-04-09T2015-architecture-and-codetour.md`.
**Inbox cleared:** Decision file removed after merge to main decisions file.

**Team updates:**
- Mouse created `.tours/how-it-works.tour` (13-step interactive CodeTour)
- Trinity (via inbox): Documented board grid row fix and color palette decision
- Coordinator: Committed all work in commit 33e26b4
