const game = require("./app");

describe("grid setup", () => {
  it("creates a grid", () => {
    const grid = game.createGrid(5, 5);
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(5);
  });

  it("checks around a cell for how many are alive", () => {
    const grid = game.createGrid(5, 5);
    grid[1][2] = 1;
    grid[2][2] = 1;
    grid[3][2] = 1;
    grid[2][3] = 1;

    const numberOfNeighbours = game.howManyAliveNeighbours(grid, 2, 2);
    expect(numberOfNeighbours).toBe(3);
  });
  it("tests the edges of the grid from top left", () => {
    const grid = game.createGrid(5, 5);
    grid[1][1] = 1;
    grid[2][2] = 1;
    const numberOfNeighbours = game.howManyAliveNeighbours(grid, 0, 0);
    expect(numberOfNeighbours).toBe(1);
  });
  it("tests the edges of the grid from bottom right", () => {
    const grid = game.createGrid(5, 5);
    grid[3][4] = 1;
    grid[3][3] = 1;
    grid[3][2] = 1;
    grid[2][3] = 1;

    const numberOfNeighbours = game.howManyAliveNeighbours(grid, 4, 4);
    expect(numberOfNeighbours).toBe(2);
  });
  it("tests the edges of rectangle", () => {
    const grid = game.createGrid(8, 5);
    grid[6][4] = 1;
    grid[7][3] = 1;

    const numberOfNeighbours = game.howManyAliveNeighbours(grid, 4, 7);
    expect(numberOfNeighbours).toBe(2);
  });
  it("A live cell with fewer than two live neighbours dies of under-population", () => {
    const currentCellX = 2;
    const currentCellY = 2;

    const grid = game.createGrid(5, 5);
    grid[1][2] = 1;
    grid[2][2] = 1;
    grid[4][4] = 1;

    const count = game.howManyAliveNeighbours(grid, currentCellX, currentCellY);
    const currentCellState = grid[currentCellY][currentCellY];

    expect(game.nextStateIsAlive(currentCellState, count)).toBe(0);
  });
  it("A live cell with 2 live neighbours lives on to the next generation", () => {
    const currentCellX = 2;
    const currentCellY = 2;

    const grid = game.createGrid(5, 5);
    grid[1][2] = 1;
    grid[2][2] = 1;
    grid[3][2] = 1;

    const count = game.howManyAliveNeighbours(grid, currentCellX, currentCellY);
    const currentCellState = grid[currentCellY][currentCellY];

    expect(game.nextStateIsAlive(currentCellState, count)).toBe(1);
  });
  it("A live cell with 3 live neighbours lives on to the next generation", () => {
    const currentCellX = 2;
    const currentCellY = 2;

    const grid = game.createGrid(5, 5);
    grid[1][2] = 1;
    grid[2][2] = 1;
    grid[3][2] = 1;
    grid[2][1] = 1;

    const count = game.howManyAliveNeighbours(grid, currentCellX, currentCellY);
    const currentCellState = grid[currentCellY][currentCellY];

    expect(game.nextStateIsAlive(currentCellState, count)).toBe(1);
  });
  it("A live cell with more than 3 live neighbours dies of overcrowding", () => {
    const currentCellX = 2;
    const currentCellY = 2;

    const grid = game.createGrid(5, 5);
    grid[1][2] = 1;
    grid[2][2] = 1;
    grid[3][2] = 1;
    grid[2][1] = 1;
    grid[1][1] = 1;

    const count = game.howManyAliveNeighbours(grid, currentCellX, currentCellY);
    const currentCellState = grid[currentCellY][currentCellY];

    expect(game.nextStateIsAlive(currentCellState, count)).toBe(0);
  });
  it("An empty cell with exactly 3 live neighbours comes to life", () => {
    const currentCellX = 2;
    const currentCellY = 2;

    const grid = game.createGrid(5, 5);
    grid[1][2] = 1;
    grid[2][2] = 0;
    grid[3][2] = 1;
    grid[2][1] = 1;

    const count = game.howManyAliveNeighbours(grid, currentCellX, currentCellY);
    const currentCellState = grid[currentCellY][currentCellY];

    expect(game.nextStateIsAlive(currentCellState, count)).toBe(1);
  });
});
