const gameboard = (() => {
  const grid = [];

  // create a 3x3 two-dimensional array
  for (let i = 0; i < 3; i++) {
    grid[i] = [];
    for (let j = 0; j < 3; j++) {
      grid[i][j] = "X";
    }
  }

  const drawGrid = () => {
    const container = document.querySelector(".grid-container");

    for (row in grid) {
      const rowElement = document.createElement("div");
      rowElement.className = "grid-row";
      for (column in grid[row]) {
        const cellElement = document.createElement("div");
        cellElement.className = "grid-cell";
        cellElement.setAttribute("data-row", row);
        cellElement.setAttribute("data-column", column);
        rowElement.appendChild(cellElement);
      }
      container.appendChild(rowElement);
    }
  };

  return { drawGrid };
})();

gameboard.drawGrid();
