import { useState } from "react";

/**
 * 00, 01, 02, 03, 04, 05, 06, 07, 08
 * 10, 11, 12, 13, 14, 15, 16, 17, 18
 * 20, 21, 22, 23, 24, 25, 26, 27, 28
 */
class Sudoku {
  constructor() {
    this.board = new Array(9).fill(0).map(() => new Array(9).fill(undefined));
    this.subgrids = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 3],
        [0, 4],
        [0, 5],
        [1, 3],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 4],
        [2, 5],
      ],
      [
        [0, 6],
        [0, 7],
        [0, 8],
        [1, 6],
        [1, 7],
        [1, 8],
        [2, 6],
        [2, 7],
        [2, 8],
      ],
      [
        [3, 0],
        [3, 1],
        [3, 2],
        [4, 0],
        [4, 1],
        [4, 2],
        [5, 0],
        [5, 1],
        [5, 2],
      ],
      [
        [3, 3],
        [3, 4],
        [3, 5],
        [4, 3],
        [4, 4],
        [4, 5],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
      [
        [3, 6],
        [3, 7],
        [3, 8],
        [4, 6],
        [4, 7],
        [4, 8],
        [5, 6],
        [5, 7],
        [5, 8],
      ],
      [
        [6, 0],
        [6, 1],
        [6, 2],
        [7, 0],
        [7, 1],
        [7, 2],
        [8, 0],
        [8, 1],
        [8, 2],
      ],
      [
        [6, 3],
        [6, 4],
        [6, 5],
        [7, 3],
        [7, 4],
        [7, 5],
        [8, 3],
        [8, 4],
        [8, 5],
      ],
      [
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 6],
        [7, 7],
        [7, 8],
        [8, 6],
        [8, 7],
        [8, 8],
      ],
    ];
  }

  setCellValue(row, col, value) {
    this.board[row][col] = value;
  }

  clearBoard() {
    this.board = new Array(9).fill(0).map(() => new Array(9).fill(undefined));
  }
}

const sudoku = new Sudoku();

export default function SudokuComponent() {
  const [_, render] = useState({});

  function handleCellChange(event) {
    const { col, row } = event.target.dataset;

    if (
      Number.isNaN(Number(event.key)) ||
      Number(event.key) > 9 ||
      Number(event.key) < 1
    )
      return;

    // check row
    if (sudoku.board[row].findIndex((cell) => cell === event.key) != -1) return;

    // check col
    if (sudoku.board.some((rowToCheck) => rowToCheck[col] === event.key))
      return;

    const subgridCol = Math.floor(col / 3);
    const subgridRow = Math.floor(row / 3);
    const subgridIdx = subgridRow * 3 + subgridCol;
    const subgrid = sudoku.subgrids[subgridIdx];

    // check subsgrid
    if (subgrid.some(([r, c]) => sudoku.board[r][c] === event.key)) return;

    sudoku.setCellValue(row, col, event.key);

    render({});
  }

  return (
    <>
      <h1>Sudoku</h1>
      <ol>
        <li>A sudoku board is a 9x9 grid, with 3x3 subgrids.</li>
        <li>
          Each sub-grid can only have digits from 1-9, and digits cannot be
          repeated
        </li>
        <li>
          Interactions The user should be able to put a number 1-9 as long as it
          does not violate rule #2 The use should be able to clear the board
        </li>
      </ol>

      <h3>Solution:</h3>

      <button
        onClick={() => {
          sudoku.clearBoard();
          render({});
        }}
      >
        Clear board
      </button>

      <div>
        {sudoku.board.map((row, idx) => (
          <div key={idx} style={{ display: "flex" }}>
            {row.map((cell, jdx) => (
              <button
                className="cell"
                type="text"
                data-col={jdx}
                data-row={idx}
                onKeyDown={handleCellChange}
                key={jdx}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
