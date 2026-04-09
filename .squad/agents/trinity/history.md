# Project Context

- **Owner:** Brady
- **Project:** TicTacToe — a human-versus-computer tic-tac-toe game with neo-brutalist design
- **Stack:** Vanilla HTML, CSS, JavaScript
- **Created:** 2026-04-09

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- **Hero color:** Electric yellow `#FFE600` — bold, high-energy, unmistakable neo-brutalist
- **Color scheme:** X marks are blue (`#1A1AFF`), O marks are hot pink (`#FF2D55`), winning cells pulse green (`#00FF88`)
- **Design system:** 4-6px black borders, hard drop shadows (`8px 8px 0 #000`), zero border-radius, monospace for marks, Arial Black/Impact for display text
- **Key files:** `index.html` (markup), `style.css` (all styling), `app.js` (UI controller connecting to `game.js` engine)
- **Board:** CSS Grid 3x3, `<button>` elements with `data-index` 0-8, aspect-ratio 1:1, scales with `min(100%, 396px)`
- **Animations:** `popIn` for mark placement (cubic-bezier bounce), `winPulse` for winning cells, `bump` for score updates, shadow-press on button hover
- **app.js contract:** imports `createGame`, `makeMove`, `makeComputerMove`, `checkWinner`, `HUMAN`, `COMPUTER`, `EMPTY` from `./game.js`
- **Computer turn delay:** 350ms for drama — locks input during AI thinking
- **Score tracking:** in-memory object `{ wins, losses, draws }`, not persisted to localStorage
- **Mobile-first responsive:** clamp() for typography, reduced shadows/borders under 400px

## 2026-04-09 Team Update (Scribe)

**Decisions archive:** UI Design System decision recorded in `.squad/decisions.md` for team styling reference.
**Orchestration log:** Work completed and logged in `.squad/orchestration-log/2026-04-09T19-16-47Z-trinity.md` — Frontend DONE, all animations and interactions complete.

- **README.md:** Created project README with Ted Neward dedication, gameplay GIF placeholder, about/how-to-play/tech-stack/tests/credits sections. Kept it direct and neo-brutalist in tone — concise, warm where it matters, zero fluff.
