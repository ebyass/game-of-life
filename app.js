function createGrid(x, y) {
  let rows = [];
  for (let i = 0; i < x; i++) {
    let col = [];
    for (let j = 0; j < y; j++) {
      col.push(0);
    }
    rows.push(col);
  }
  return rows;
}

function howManyAliveNeighbours(grid, posX, posY) {
  let count = 0;

  for (
    let currentPositionX = posX - 1;
    currentPositionX <= posX + 1;
    currentPositionX++
  ) {
    for (
      let currentPositionY = posY - 1;
      currentPositionY <= posY + 1;
      currentPositionY++
    ) {
      if (
        (currentPositionY === posY && currentPositionX === posX) ||
        currentPositionY < 0 ||
        currentPositionX < 0 ||
        currentPositionY >= grid.length || // this is the length of the array which is the rows
        currentPositionX >= grid[0].length // weve grabbed a row and inspected its length ( the cols)
      ) {
        //blah
      } else {
        count += grid[currentPositionY][currentPositionX];
      }
    }
  }
  return count;
}

function nextStateIsAlive(currentCellState, count) {
  // A live cell with fewer than two live neighbours dies of under-population
  if (currentCellState === 1 && count < 2) return 0;
  // A live cell with 2 or 3 live neighbours lives on to the next generation
  if (currentCellState === 1 && (count === 2 || count === 3)) return 1;
  // A live cell with more than 3 live neighbours dies of overcrowding
  if (currentCellState === 1 && count > 3) return 0;
  // An empty cell with exactly 3 live neighbours "comes to life"
  if (currentCellState === 0 && count === 3) return 1;

  // maybe returns current cell state or returns 0?
  return -1;
}

module.exports = { createGrid, howManyAliveNeighbours, nextStateIsAlive };
