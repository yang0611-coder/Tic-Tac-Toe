# Decision: Fix Board Grid Row Collapse

**Author:** Trinity (Frontend Dev)  
**Date:** 2025-07-15  
**Status:** Implemented

## Problem
Empty tic-tac-toe board rows were shorter than rows containing X/O marks. The `.board` grid only defined `grid-template-columns: repeat(3, 1fr)` with no explicit row template. Combined with `aspect-ratio: 1` on the board, CSS grid auto-sized rows based on content — empty rows collapsed, content rows expanded.

## Fix
1. Added `grid-template-rows: repeat(3, 1fr)` to `.board` — forces all three rows to equal height regardless of content.
2. Added `aspect-ratio: 1` to `.cell` — ensures each cell stays square, reinforcing the grid structure at the cell level.

## Why Not Other Approaches
- `min-height` on cells would be fragile across viewports.
- `height: 33.33%` would fight with the grid layout.
- Explicit row template is the correct CSS Grid solution — it's what `grid-template-columns` already does for columns.

## Responsive Impact
The 400px media query only adjusts border widths and shadows — no conflict with the new row template or cell aspect-ratio.
