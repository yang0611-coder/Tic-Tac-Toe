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
