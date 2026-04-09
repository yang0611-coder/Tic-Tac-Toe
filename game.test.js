import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  createGame,
  makeMove,
  makeComputerMove,
  getComputerMove,
  checkWinner,
  isValidMove,
  HUMAN,
  COMPUTER,
  EMPTY,
} from './game.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function boardFrom(layout) {
  // Accept a 9-char string like 'XO__X__O_' → array
  return layout.split('').map((c) => (c === '_' ? EMPTY : c));
}

function stateWith(board, opts = {}) {
  return {
    board: typeof board === 'string' ? boardFrom(board) : board,
    currentPlayer: opts.currentPlayer ?? HUMAN,
    gameOver: opts.gameOver ?? false,
    winner: opts.winner ?? null,
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

describe('constants', () => {
  it('HUMAN is X', () => assert.equal(HUMAN, 'X'));
  it('COMPUTER is O', () => assert.equal(COMPUTER, 'O'));
  it('EMPTY is empty string', () => assert.equal(EMPTY, ''));
});

// ---------------------------------------------------------------------------
// createGame
// ---------------------------------------------------------------------------

describe('createGame', () => {
  it('should return initial game state', () => {
    const state = createGame();
    assert.deepStrictEqual(state.board, Array(9).fill(''));
    assert.equal(state.currentPlayer, HUMAN);
    assert.equal(state.gameOver, false);
    assert.equal(state.winner, null);
  });

  it('should return a new object each call', () => {
    const a = createGame();
    const b = createGame();
    assert.notStrictEqual(a, b);
    assert.notStrictEqual(a.board, b.board);
  });
});

// ---------------------------------------------------------------------------
// makeMove
// ---------------------------------------------------------------------------

describe('makeMove', () => {
  it('places human mark and switches to computer', () => {
    const state = createGame();
    const next = makeMove(state, 0);
    assert.equal(next.board[0], HUMAN);
    assert.equal(next.currentPlayer, COMPUTER);
  });

  it('returns null for occupied cell', () => {
    const state = createGame();
    const next = makeMove(state, 0);
    const bad = makeMove(next, 0);
    assert.equal(bad, null);
  });

  it('returns null for negative index', () => {
    assert.equal(makeMove(createGame(), -1), null);
  });

  it('returns null for index >= 9', () => {
    assert.equal(makeMove(createGame(), 9), null);
  });

  it('returns null when game is over', () => {
    const state = stateWith('XXX______', { gameOver: true, winner: HUMAN });
    const result = makeMove(state, 5);
    assert.equal(result, null);
  });

  it('detects a win after the move', () => {
    // X already at 0,1 — placing at 2 wins
    const state = stateWith('XX_OO____', { currentPlayer: HUMAN });
    const next = makeMove(state, 2);
    assert.equal(next.gameOver, true);
    assert.equal(next.winner, HUMAN);
  });

  it('detects a draw after the last move', () => {
    // Board nearly full, one empty cell, no winner possible
    // X O X
    // X X O
    // O _ X
    const state = stateWith('XOXXXOO_X', { currentPlayer: HUMAN });
    // Placing X at index 7 — but that would give X a win? Let me verify:
    // Row 0: X O X — no win
    // Row 1: X X O — no win
    // Row 2: O X X — no win
    // Cols: 0=X,X,O 1=O,X,X 2=X,O,X — col2 no, col1 no
    // Diag: X,X,X — that's a win! Let me pick a draw board.
    // O X O
    // X X O
    // X O _
    const drawState = stateWith('OXOXXOXO_', { currentPlayer: HUMAN });
    const next = makeMove(drawState, 8);
    // Board: O X O / X X O / X O X — no three in a row
    assert.equal(next.gameOver, true);
    assert.equal(next.winner, 'draw');
  });
});

// ---------------------------------------------------------------------------
// checkWinner
// ---------------------------------------------------------------------------

describe('checkWinner', () => {
  describe('row wins', () => {
    it('top row', () => {
      assert.equal(checkWinner(boardFrom('XXX______')), HUMAN);
    });
    it('middle row', () => {
      assert.equal(checkWinner(boardFrom('___XXX___')), HUMAN);
    });
    it('bottom row', () => {
      assert.equal(checkWinner(boardFrom('______XXX')), HUMAN);
    });
  });

  describe('column wins', () => {
    it('left column', () => {
      assert.equal(checkWinner(boardFrom('X__X__X__')), HUMAN);
    });
    it('center column', () => {
      assert.equal(checkWinner(boardFrom('_X__X__X_')), HUMAN);
    });
    it('right column', () => {
      assert.equal(checkWinner(boardFrom('__X__X__X')), HUMAN);
    });
  });

  describe('diagonal wins', () => {
    it('top-left to bottom-right', () => {
      assert.equal(checkWinner(boardFrom('X___X___X')), HUMAN);
    });
    it('top-right to bottom-left', () => {
      assert.equal(checkWinner(boardFrom('__X_X_X__')), HUMAN);
    });
  });

  describe('O wins', () => {
    it('detects O winning a row', () => {
      assert.equal(checkWinner(boardFrom('OOO______')), COMPUTER);
    });
    it('detects O winning a column', () => {
      assert.equal(checkWinner(boardFrom('O__O__O__')), COMPUTER);
    });
    it('detects O winning a diagonal', () => {
      assert.equal(checkWinner(boardFrom('O___O___O')), COMPUTER);
    });
  });

  describe('draw', () => {
    it('full board with no winner is draw', () => {
      // X O X
      // X O O
      // O X X
      assert.equal(checkWinner(boardFrom('XOXXOOOXX')), 'draw');
    });
  });

  describe('ongoing game', () => {
    it('returns null for empty board', () => {
      assert.equal(checkWinner(boardFrom('_________')), null);
    });
    it('returns null for partially filled board with no winner', () => {
      assert.equal(checkWinner(boardFrom('XO_______')), null);
    });
  });
});

// ---------------------------------------------------------------------------
// isValidMove
// ---------------------------------------------------------------------------

describe('isValidMove', () => {
  it('returns true for empty cell in active game', () => {
    assert.equal(isValidMove(createGame(), 0), true);
    assert.equal(isValidMove(createGame(), 4), true);
    assert.equal(isValidMove(createGame(), 8), true);
  });

  it('returns false for occupied cell', () => {
    const state = stateWith('X________');
    assert.equal(isValidMove(state, 0), false);
  });

  it('returns false when game is over', () => {
    const state = stateWith('XXX______', { gameOver: true, winner: HUMAN });
    assert.equal(isValidMove(state, 5), false);
  });

  it('returns false for negative index', () => {
    assert.equal(isValidMove(createGame(), -1), false);
  });

  it('returns false for index >= 9', () => {
    assert.equal(isValidMove(createGame(), 9), false);
    assert.equal(isValidMove(createGame(), 100), false);
  });

  it('returns false for non-integer index', () => {
    assert.equal(isValidMove(createGame(), 1.5), false);
  });
});

// ---------------------------------------------------------------------------
// AI — getComputerMove
// ---------------------------------------------------------------------------

describe('getComputerMove', () => {
  it('takes an immediate winning move', () => {
    // O at 0,1 — index 2 wins for O
    const state = stateWith('OO_X_X___', { currentPlayer: COMPUTER });
    assert.equal(getComputerMove(state), 2);
  });

  it('blocks human winning move', () => {
    // X at 0,1 — index 2 would let X win. O must block.
    const state = stateWith('XX_O_____', { currentPlayer: COMPUTER });
    assert.equal(getComputerMove(state), 2);
  });

  it('returns a valid index (0-8) on empty cell', () => {
    const state = stateWith('X___O____', { currentPlayer: COMPUTER });
    const move = getComputerMove(state);
    assert.ok(move >= 0 && move <= 8);
    assert.equal(state.board[move], EMPTY);
  });

  it('picks the only remaining cell', () => {
    // One cell left at index 4
    const state = stateWith('XOXXOOX_O', { currentPlayer: COMPUTER });
    assert.equal(getComputerMove(state), 7);
  });

  it('prefers winning over blocking', () => {
    // O can win at index 6 (column 0: O,O,_) OR block X at index 2 (X,X,_)
    const state = stateWith('OX_OX____', { currentPlayer: COMPUTER });
    assert.equal(getComputerMove(state), 6);
  });
});

// ---------------------------------------------------------------------------
// AI — makeComputerMove
// ---------------------------------------------------------------------------

describe('makeComputerMove', () => {
  it('places computer mark on the board', () => {
    const state = stateWith('X________', { currentPlayer: COMPUTER });
    const next = makeComputerMove(state);
    const placed = next.board.filter((c) => c === COMPUTER).length;
    assert.equal(placed, 1);
  });

  it('switches currentPlayer back to human', () => {
    const state = stateWith('X________', { currentPlayer: COMPUTER });
    const next = makeComputerMove(state);
    assert.equal(next.currentPlayer, HUMAN);
  });

  it('detects a computer win', () => {
    const state = stateWith('OO_XX____', { currentPlayer: COMPUTER });
    const next = makeComputerMove(state);
    assert.equal(next.gameOver, true);
    assert.equal(next.winner, COMPUTER);
  });

  it('returns valid state object', () => {
    const state = stateWith('X________', { currentPlayer: COMPUTER });
    const next = makeComputerMove(state);
    assert.ok(Array.isArray(next.board));
    assert.equal(next.board.length, 9);
    assert.equal(typeof next.gameOver, 'boolean');
  });
});

// ---------------------------------------------------------------------------
// State immutability
// ---------------------------------------------------------------------------

describe('state immutability', () => {
  it('makeMove does not mutate the original state', () => {
    const state = createGame();
    const boardCopy = [...state.board];
    makeMove(state, 4);
    assert.deepStrictEqual(state.board, boardCopy);
    assert.equal(state.currentPlayer, HUMAN);
    assert.equal(state.gameOver, false);
  });

  it('makeComputerMove does not mutate the original state', () => {
    const state = stateWith('X________', { currentPlayer: COMPUTER });
    const boardCopy = [...state.board];
    makeComputerMove(state);
    assert.deepStrictEqual(state.board, boardCopy);
    assert.equal(state.currentPlayer, COMPUTER);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('edge cases', () => {
  it('handles game with only one empty cell (no winner yet)', () => {
    // O X O
    // X O X
    // X O _   — placing X at 8 → draw
    const state = stateWith('OXOXOXXO_', { currentPlayer: HUMAN });
    assert.equal(isValidMove(state, 8), true);
    const next = makeMove(state, 8);
    assert.equal(next.gameOver, true);
    assert.equal(next.winner, 'draw');
  });

  it('handles board with multiple winning lines', () => {
    // X wins both row 0 and diagonal
    // X X X
    // O X O
    // _ _ X
    const board = boardFrom('XXXOXO__X');
    assert.equal(checkWinner(board), HUMAN);
  });
});

// ---------------------------------------------------------------------------
// Full game simulation: AI never loses
// ---------------------------------------------------------------------------

describe('AI never loses (exhaustive)', () => {
  function playAllHumanMoves(state) {
    // If game is over, return the result
    if (state.gameOver) {
      // AI should never lose
      assert.notEqual(state.winner, HUMAN, 'AI lost! Board: ' + state.board);
      return;
    }

    if (state.currentPlayer === COMPUTER) {
      const next = makeComputerMove(state);
      playAllHumanMoves(next);
      return;
    }

    // Try every valid human move
    for (let i = 0; i < 9; i++) {
      if (isValidMove(state, i)) {
        const next = makeMove(state, i);
        playAllHumanMoves(next);
      }
    }
  }

  it('AI never loses when human goes first', () => {
    playAllHumanMoves(createGame());
  });
});
