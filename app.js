import { createGame, makeMove, makeComputerMove, checkWinner, HUMAN, COMPUTER, EMPTY } from './game.js';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const scoreWinsEl = document.getElementById('score-wins');
const scoreDrawsEl = document.getElementById('score-draws');
const scoreLossesEl = document.getElementById('score-losses');

const score = { wins: 0, losses: 0, draws: 0 };
let gameState = null;
let inputLocked = false;

function init() {
  gameState = createGame();
  inputLocked = false;
  renderBoard();
  setStatus('YOUR MOVE, HUMAN.', '');
}

function renderBoard() {
  cells.forEach((cell, i) => {
    const mark = gameState.board[i];
    cell.textContent = mark;
    cell.className = 'cell';

    if (mark === HUMAN) {
      cell.classList.add('played', 'mark-x', 'pop');
    } else if (mark === COMPUTER) {
      cell.classList.add('played', 'mark-o', 'pop');
    }

    if (inputLocked || gameState.gameOver || mark !== EMPTY) {
      cell.classList.add('disabled');
    }
  });
}

function setStatus(text, modifier) {
  statusEl.textContent = text;
  statusEl.className = 'status-message';
  if (modifier) {
    statusEl.classList.add(modifier);
  }
}

function highlightWinningCells(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      return;
    }
  }
}

function markDraw() {
  cells.forEach(cell => {
    if (!cell.classList.contains('winner')) {
      cell.classList.add('draw-cell');
    }
  });
}

function updateScore(key) {
  score[key]++;
  scoreWinsEl.textContent = score.wins;
  scoreDrawsEl.textContent = score.draws;
  scoreLossesEl.textContent = score.losses;

  const el = key === 'wins' ? scoreWinsEl :
             key === 'losses' ? scoreLossesEl : scoreDrawsEl;
  el.classList.remove('score-bump');
  void el.offsetWidth;
  el.classList.add('score-bump');
}

function handleResult() {
  const result = checkWinner(gameState.board);

  if (result === HUMAN) {
    gameState.gameOver = true;
    gameState.winner = HUMAN;
    setStatus('YOU WIN!', 'winner-x');
    highlightWinningCells(gameState.board);
    updateScore('wins');
    return true;
  }

  if (result === COMPUTER) {
    gameState.gameOver = true;
    gameState.winner = COMPUTER;
    setStatus('MACHINE WINS.', 'winner-o');
    highlightWinningCells(gameState.board);
    updateScore('losses');
    return true;
  }

  if (result === 'draw') {
    gameState.gameOver = true;
    gameState.winner = 'draw';
    setStatus('DRAW. STALEMATE.', 'draw');
    markDraw();
    updateScore('draws');
    return true;
  }

  return false;
}

function handleCellClick(e) {
  if (inputLocked || gameState.gameOver) return;

  const index = parseInt(e.target.dataset.index, 10);
  if (isNaN(index)) return;

  const nextState = makeMove(gameState, index);
  if (!nextState) return;

  gameState = nextState;
  renderBoard();

  if (handleResult()) return;

  // Computer's turn
  inputLocked = true;
  setStatus('MACHINE THINKING...', '');
  disableCells();

  setTimeout(() => {
    gameState = makeComputerMove(gameState);
    renderBoard();
    inputLocked = false;

    if (handleResult()) return;

    setStatus('YOUR MOVE, HUMAN.', '');
    enableCells();
  }, 350);
}

function disableCells() {
  cells.forEach(cell => cell.classList.add('disabled'));
}

function enableCells() {
  cells.forEach((cell, i) => {
    if (gameState.board[i] === EMPTY && !gameState.gameOver) {
      cell.classList.remove('disabled');
    }
  });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', init);

// Start
init();
