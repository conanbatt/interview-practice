import { useState } from "react";

/**
 * 00, 01, 02, 03, 04, 05, 06, 07, 08
 * 10, 11, 12, 13, 14, 15, 16, 17, 18
 * 20, 21, 22, 23, 24, 25, 26, 27, 28
 */
class Sudoku {
  constructor() {
    this.board = new Array(9).fill(0).map(() => new Array(9).fill(undefined));
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

    // check subsgrid
    for (let rowIdx = subgridRow * 3; rowIdx < (subgridRow + 1) * 3; rowIdx++) {
      for (
        let colIdx = subgridCol * 3;
        colIdx < (subgridCol + 1) * 3;
        colIdx++
      ) {
        if (sudoku.board[rowIdx][colIdx] === event.key) {
          return;
        }
      }
    }

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
