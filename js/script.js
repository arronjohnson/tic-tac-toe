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

    if (!game.isStarted() || game.isFinished() || _grid[row][column] !== "") {
      return;
    }

    element.textContent = game.getCurrentPlayer().getMarker();
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

  const reset = () => {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((e) => (e.textContent = ""));

    for (row in _grid) {
      for (column in _grid[row]) {
        _grid[row][column] = "";
      }
    }
  };

  return { drawGrid, reset };
})();

const Player = (name, marker) => {
  const _name = name;
  const _marker = marker;

  const getName = () => {
    return _name;
  };

  const getMarker = () => {
    return _marker;
  };

  return { getName, getMarker };
};

const game = (() => {
  let _gameStarted;
  let _player1;
  let _player2;
  let _currentPlayer;
  let _winner;

  const start = () => {
    if (_gameStarted) return;

    const _playerNames = controls.getPlayerNames();
    _gameStarted = true;
    _player1 = Player(_playerNames[0], "X");
    _player2 = Player(_playerNames[1], "O");
    _currentPlayer = _player1;
    _winner = null;
    controls.setStatusText(`${_player1.getName()}'s turn`);
  };

  const getCurrentPlayer = () => {
    return _currentPlayer;
  };

  const switchTurn = () => {
    _currentPlayer = _currentPlayer === _player1 ? _player2 : _player1;
    controls.setStatusText(`${_currentPlayer.getName()}'s turn`);
  };

  const setWinner = (winner) => {
    if (isFinished()) return;

    _winner = winner;
    if (_winner === "tie") {
      controls.setStatusText("It's a tie!");
    } else {
      controls.setStatusText(`${_winner.getName()} is the winner!`);
    }
  };

  const isStarted = () => {
    return _gameStarted;
  };

  const isFinished = () => {
    return _winner !== null;
  };

  const reset = () => {
    _gameStarted = false;
    controls.setStatusText("");
    gameboard.reset();
  };

  return {
    start,
    getCurrentPlayer,
    switchTurn,
    setWinner,
    isStarted,
    isFinished,
    reset,
  };
})();

const controls = (() => {
  const _form = document.querySelector(".modal-content");
  const _inputP1 = document.getElementById("p1name");
  const _inputP2 = document.getElementById("p2name");
  const _modal = document.querySelector(".modal");
  const _resetBtn = document.querySelector("button.reset");
  const _startBtn = document.querySelector("button.start");
  const _status = document.querySelector(".status");

  _form.addEventListener("submit", (e) => _submitForm(e));
  _resetBtn.addEventListener("click", () => game.reset());
  _startBtn.addEventListener("click", () => {
    if (!game.isStarted()) {
      _toggleModal();
    }
  });

  const _submitForm = (e) => {
    e.preventDefault();

    _toggleModal();
    game.start();
  };

  const _toggleModal = () => {
    if (_modal.classList.contains("active")) {
      _modal.classList.remove("active");
      _modal.style.display = "none";
    } else {
      _modal.classList.add("active");
      _modal.style.display = "block";
    }
  };

  const getPlayerNames = () => {
    return [_inputP1.value, _inputP2.value];
  };

  const setStatusText = (msg) => {
    _status.textContent = msg;
  };

  return { getPlayerNames, setStatusText };
})();

gameboard.drawGrid();
