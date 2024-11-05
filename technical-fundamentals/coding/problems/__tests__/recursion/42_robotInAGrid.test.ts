import robotInAGrid from "../../42_robotInAGrid";

describe("robotInAGrid", () => {
  test("returns correct path for a 3x3 grid", () => {
    const grid1: boolean[][] = [
      [true, true, false],
      [true, false, true],
      [true, true, true],
    ];
    expect(robotInAGrid(grid1)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });

  test("returns correct path for a 4x4 grid", () => {
    const grid2: boolean[][] = [
      [true, true, true, false],
      [true, false, true, true],
      [true, true, false, false],
      [false, true, true, true],
    ];
    expect(robotInAGrid(grid2)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ]);
  });

  test("returns false for no path", () => {
    const grid2: boolean[][] = [
      [true, false, true, false],
      [false, false, true, true],
      [true, true, true, false],
      [true, true, true, true],
    ];
    expect(robotInAGrid(grid2)).toBeFalsy();
  });
});
