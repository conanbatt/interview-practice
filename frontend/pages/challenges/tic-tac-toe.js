// Build a tic tac toe game with history

import { useState } from "react"

const BOARD_X = 3
const BOARD_Y = 3
const INITIAL_BOARD = Array(BOARD_X).fill('').map(_ => Array(BOARD_Y).fill(''))
const X_Side = "X"
const O_Side = "O"

export default function TicTacToe() {
  const [board, setBoard] = useState(INITIAL_BOARD)
  const [side, setSide] = useState(X_Side)
  const [history, setHistory] = useState([])

  const toggleSide = () => {
    setSide(side === X_Side ? O_Side : X_Side)
  }

  const handleClick = (x, y) => () => {
    if (board[x][y]) return;
    setBoard(prevBoard => prevBoard.map((row, ri) => row.map((cell, ci) => ri === x && ci === y ? side : cell)))
    setHistory(prevHistory => prevHistory.slice().concat({ side, board }))
    toggleSide()
  }

  const getBoardWinner = () => {
    for (let i = 0; i < BOARD_X; i++) {
      if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== "") {
        return board[0][i]
      }
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== "") {
        return board[i][0]
      }
    }
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== "") return board[0][0]
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== "") return board[0][2]
    return null
  }

  const goToStep = (stepNumber) => () => {
    setSide(history[stepNumber+1].side !== X_Side ? O_Side : X_Side)
    setBoard(history[stepNumber+1].board)
    setHistory(history.slice(0, stepNumber + 1))
  }

  const restartGame = () => {
    setSide(X_Side);
    setHistory([]);
    setBoard(INITIAL_BOARD);
  };

  const winner = getBoardWinner()

  return (
    <div className="ttt">
      <h1>
        Tic Tac Toe
      </h1>
      <p>
        Build a tic tac toe game with history
      </p>
      <h3 >{winner ? <>{winner} winner!</>:<>{ side } turn</>}</h3>
      <div className="layout">
        <div className="board">
          {board.map((row, ri) => <div className="row" key={ri}>
            {row.map((cell, ci) => <input disabled={winner} type="button" className="cell" key={ci} value={cell} onClick={handleClick(ri, ci)} />)}
          </div>)}
        </div>
        <div className="results">
          <div className="history">
            {history.length > 0 && <button
              onClick={restartGame}>
              Restart game
            </button>}
            {history.map(({ side }, i) =>
              <button
                disabled={i === history.length - 1}
                onClick={goToStep(i)}>
                {i === history.length - 1 ? 'Actual Step' : "Go to step"} {i + 1} : {side}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
