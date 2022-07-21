const gameboard = (() => {
  const _grid = [];

  // create a 3x3 two-dimensional array
  for (let i = 0; i < 3; i++) {
    _grid[i] = [];

    for (let j = 0; j < 3; j++) {
      _grid[i][j] = "";
    }
  }

  const drawGrid = () => {
    const container = document.querySelector(".grid-container");

    for (row in _grid) {
      const rowElement = document.createElement("div");
      rowElement.className = "grid-row";

      for (column in _grid[row]) {
        const cellElement = document.createElement("div");
        cellElement.className = "grid-cell";
        cellElement.setAttribute("data-row", row);
        cellElement.setAttribute("data-column", column);
        cellElement.addEventListener("click", (e) => _fillCell(e.target));
        rowElement.appendChild(cellElement);
      }
      container.appendChild(rowElement);
    }
  };

  const _fillCell = (element) => {
    const row = element.getAttribute("data-row");
    const column = element.getAttribute("data-column");

    if (game.isFinished() || _grid[row][column] !== "") {
      return;
    }

    element.textContent = game.getCurrentPlayer().marker;
    _grid[row][column] = game.getCurrentPlayer();
    game.switchTurn();
    checkGrid();
  };

  const checkGrid = () => {
    _checkRows();
    _checkColumns();
    _checkDiagonals();
    _checkFilled();
  };

  const _checkCells = (cells) => {
    const player = cells[0];
    if (!!player && cells.every((c) => c === player)) {
      game.setWinner(player);
    }
  };

  const _checkRows = () => {
    for (row in _grid) {
      _checkCells(_grid[row]);
    }
  };

  const _checkColumns = () => {
    for (row in _grid) {
      const cells = [];
      for (column in _grid[row]) {
        cells.push(_grid[column][row]);
      }
      _checkCells(cells);
    }
  };

  const _checkDiagonals = () => {
    const mainCells = []; // main diagonal
    const minorCells = []; // minor diagonal
    for (row in _grid) {
      mainCells.push(_grid[row][row]);
      minorCells.push(_grid[row][3 - 1 - row]);
    }
    _checkCells(mainCells);
    _checkCells(minorCells);
  };

  const _checkFilled = () => {
    if (!_grid.flat().includes("")) {
      game.setWinner("tie");
    }
  };

  return { drawGrid };
})();

const Player = (marker) => {
  return { marker };
};

const game = (() => {
  let _currentPlayer;
  let _winner;

  const player1 = Player("X");
  const player2 = Player("O");

  const start = () => {
    _currentPlayer = player1;
    _winner = null;
  };

  const getCurrentPlayer = () => {
    return _currentPlayer;
  };

  const switchTurn = () => {
    _currentPlayer = _currentPlayer === player1 ? player2 : player1;
  };

  const setWinner = (winner) => {
    if (isFinished()) return;

    _winner = winner;
    if (_winner === "tie") {
      console.log("It's a tie!");
    } else {
      console.log(`${winner.marker} is the winner!`);
    }
  };

  const isFinished = () => {
    return _winner !== null;
  };

  return {
    start,
    getCurrentPlayer,
    switchTurn,
    setWinner,
    isFinished,
  };
})();

gameboard.drawGrid();
game.start();
