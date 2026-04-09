// Game Engine — Pure logic, no DOM, no side effects.

export const HUMAN = 'X';
export const COMPUTER = 'O';
export const EMPTY = '';

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export function createGame() {
  return {
    board: Array(9).fill(EMPTY),
    currentPlayer: HUMAN,
    gameOver: false,
    winner: null,
  };
}

export function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] !== EMPTY && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return board.every(cell => cell !== EMPTY) ? 'draw' : null;
}

export function isValidMove(state, index) {
  return (
    index >= 0 &&
    index < 9 &&
    state.board[index] === EMPTY &&
    !state.gameOver
  );
}

export function makeMove(state, index) {
  if (!isValidMove(state, index)) return null;

  const board = [...state.board];
  board[index] = state.currentPlayer;
  const winner = checkWinner(board);

  return {
    board,
    currentPlayer: state.currentPlayer === HUMAN ? COMPUTER : HUMAN,
    gameOver: winner !== null,
    winner,
  };
}

export function getComputerMove(state) {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (state.board[i] !== EMPTY) continue;
    const board = [...state.board];
    board[i] = COMPUTER;
    const score = minimax(board, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return bestMove;
}

export function makeComputerMove(state) {
  const index = getComputerMove(state);
  if (index === -1) return state;

  const board = [...state.board];
  board[index] = COMPUTER;
  const winner = checkWinner(board);

  return {
    board,
    currentPlayer: HUMAN,
    gameOver: winner !== null,
    winner,
  };
}

// Minimax — scores every possible future and picks the optimal path.
// COMPUTER maximizes, HUMAN minimizes.
function minimax(board, isMaximizing) {
  const result = checkWinner(board);
  if (result === COMPUTER) return 1;
  if (result === HUMAN) return -1;
  if (result === 'draw') return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] !== EMPTY) continue;
      board[i] = COMPUTER;
      best = Math.max(best, minimax(board, false));
      board[i] = EMPTY;
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] !== EMPTY) continue;
      board[i] = HUMAN;
      best = Math.min(best, minimax(board, true));
      board[i] = EMPTY;
    }
    return best;
  }
}
