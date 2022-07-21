const gameboard = (() => {
  const grid = [];

  // create a 3x3 two-dimensional array
  for (let i = 0; i < 3; i++) {
    grid[i] = [];

    for (let j = 0; j < 3; j++) {
      grid[i][j] = "";
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
        cellElement.addEventListener("click", (e) => fillCell(e.target));
        rowElement.appendChild(cellElement);
      }
      container.appendChild(rowElement);
    }

    const fillCell = (element) => {
      const row = element.getAttribute("data-row");
      const column = element.getAttribute("data-column");

      if (grid[row][column] !== "") return;

      element.textContent = "X";
      grid[row][column] = "X";
      console.log(`Set ${row} ${column} to X`);
    };
  };

  return { drawGrid };
})();

gameboard.drawGrid();
