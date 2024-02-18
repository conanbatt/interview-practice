import { useState } from "react"

const INITIAL_BOARD = Array(9).fill('').map(() => Array(9).fill(''))

export default function Sudoku() {
  const [board, setBoard] = useState(INITIAL_BOARD)

  function isValid(value, x, y) {
    const valid = value > 0 && value <= 9 &&
      !Array(9).fill('').some
        ((_, index) => board[x][index] === value ||
          board[index][y] === value ||
          board[(x - (x % 3)) + Math.floor(index / 3)][(y - (y % 3)) + index % 3] === value
        )
    return valid
  }

  function handleChange(x, y) {
    return (e) => {
      const value = e.target.value
      if (!isValid(value, x, y)) return
      const newBoard = board.map(row => [...row])
      newBoard[x][y] = value
      setBoard(newBoard)
    }
  }

  return (
    <>
      <h1>
        Sudoku
      </h1>
      {board.map((row, ri) => <div className="row" key={ri}>
        {row.map((cell, ci) => <input className="cell" key={ci} value={cell} type="number" onChange={handleChange(ri, ci)} />)}
      </div>)}
    </>
  )
}
