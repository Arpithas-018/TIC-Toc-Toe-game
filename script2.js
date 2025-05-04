const board = document.getElementById("board");
const statusEl = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");
let mode = "player"; // default mode

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    mode = e.target.value;
    resetGame();
  });
});

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  });
  updateStatus();
}

function updateStatus() {
  statusEl.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] !== "" || !gameActive) return;

  makeMove(index);
  
  if (mode === "computer" && currentPlayer === "O" && gameActive) {
    setTimeout(() => {
      computerMove();
    }, 500);
  }
}

function makeMove(index) {
  cells[index] = currentPlayer;
  document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer;

  if (checkWin()) {
    statusEl.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusEl.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function computerMove() {
  let emptyIndices = cells.map((v, i) => (v === "" ? i : null)).filter(i => i !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex);
}

function checkWin() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winCombos.some(combo =>
    combo.every(index => cells[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = "X";
  cells = Array(9).fill("");
  gameActive = true;
  createBoard();
}

createBoard();
