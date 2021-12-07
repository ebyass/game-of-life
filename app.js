function setBlinker() {
  const grid = createGrid(5, 5);

  grid[2][1] = 1;
  grid[2][2] = 1;
  grid[2][3] = 1;
  return grid;
}

function setToad() {
  const grid = createGrid(6, 6);

  grid[2][2] = 1;
  grid[2][3] = 1;
  grid[2][4] = 1;
  grid[3][1] = 1;
  grid[3][2] = 1;
  grid[3][3] = 1;
  return grid;
}

function createGrid(gridXLength, gridYLength) {
  let rows = [];
  for (let y = 0; y < gridYLength; y++) {
    let col = [];
    for (let x = 0; x < gridXLength; x++) {
      col.push(0);
    }
    rows.push(col);
  }
  return rows;
}

function updateGrid(grid) {
  if (!grid && grid[0].length) {
    throw error("unexpected nonsense");
  }
  // create a new grid with new state
  const newGrid = createGrid(grid.length, grid[0].length);
  // loop through the grid
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const currentCellState = grid[y][x];
      // console.log(currentCellState);
      // for each cell calculate how many neighbours
      const count = howManyAliveNeighbours(grid, x, y);
      // set the next state of cell
      newGrid[y][x] = nextStateIsAlive(currentCellState, count);
    }
  }
  return newGrid;
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
  return currentCellState;
}

function getStartingGrid() {
  // create the grid
  // populate with initial state
  return setToad();
}

function main() {
  // set starting grid
  let gridReturned = getStartingGrid();
  // display the grid
  console.log(gridReturned);
  for (let i = 0; i < 5; i++) {
    // calculate the next state of grid and update grid
    gridReturned = updateGrid(gridReturned);
    // display new grid
    console.log(gridReturned);
    // repeat calculate and update
  }
}
main();
module.exports = { createGrid, howManyAliveNeighbours, nextStateIsAlive };

// var readline = require("readline");

// readline.emitKeypressEvents(process.stdin);

// if (process.stdin.isTTY) process.stdin.setRawMode(true);

// process.stdin.on("keypress", (chunk, key) => {
//   if (key && key.name == "q") process.exit();
// });
