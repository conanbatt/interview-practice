import { useEffect, useState } from "react";


const shapes = [
  [
    [0,1,0]
    [1, 1,1]
  ],
  [
    [1],
    [1],
    [1,1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1],
    [1],
    [1],
    [1],
  ],
]

class Piece {
  x = 0;
  y = 0;
  shape = shapes[0]

  constructor() {
    const rnd = Math.round(Math.random() * shapes.length)
    this.shape = shapes[rnd]
  }
}

function Tetris() {

  const [board, setBoard] = useState(() => Array.from({ length: 10 }, () => Array(10).fill(0)))

  // timer goes down
  // loose

  const [piece, setPiece] = useState(new Piece());

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        default:
          break;
      }
    };


    const movePiece = (dx, dy) => {
      const newPiece = { ...piece };
      newPiece.x += dx;
      newPiece.y += dy;

      const colision = isColision(newPiece)

      // Check if has a colisiton
      if (!colision) {
        setPiece(newPiece);
      } else if (colision !== 'out'){
        piece.y += 1
        mergePieceWithBoard(piece)
        setPiece(()=>new Piece())
      }
    };

    const movePieceDown = () => {
      movePiece(0, 1)
    }
    const interval = setInterval(movePieceDown, 1000)

    const isColision = (p) => {
      for (let i = 0; i < p.shape.length; i++) {
        for (let j = 0; j < p.shape[0].length; j++) {
          const isOutOfBoard = (j + p.x < 0) || (i + p.y < 0) || (j + p.x >= board.length)
          if(isOutOfBoard) return 'out';
          const bottomBoardCollision = (i + p.y + 1 >= board[0].length)
          if (bottomBoardCollision) return true
          const bottomBoardPaintedCollision = !!p.shape[i][j] && !!board[i + p.y + 1][j + p.x]
          console.log("🚀 ~ isColision ~ p.shape[i][j]:", j + p.x, i + p.y + 1, board[i + p.y + 1][j + p.x], board)
          window.board = board
          if(bottomBoardPaintedCollision) return true
        }
      }
      return false
    };

    const mergePieceWithBoard = (piece) => {
      const newBoard = board.map((row, i) =>
        row.map((cell, j) => board[i][j] + (piece?.shape[i - piece?.y]?.[j - piece?.x] || 0))
      );

      for (let i = newBoard.length - 1; i >= 0; i--) {
        if (newBoard[i].every((cell) => !!cell)) {
          newBoard.splice(i, 1);
          newBoard.unshift(Array(board[0].length).fill(0));
          i++
        }
      }

      setBoard(newBoard);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    };
  }, [board, piece]);

  const newBoard = board.map((row, i) =>
    row.map((cell, j) => board[i][j] + (piece?.shape[i - piece?.y]?.[j - piece?.x] || 0))
  );

  return (
    <div>
      {
        newBoard.map((row, i) => row.map((cell, j) => (newBoard[i][j] += piece?.shape[i - piece?.y]?.[j - piece?.x] || 0))).map((item, row) => <div>{
          item.map((cell, column) => <div className="cell" key={`${row}_${column}`} style={cell === 0 ? { backgroundColor: 'white' } : cell === 1 ? { backgroundColor: 'blue' } : { backgroundColor: 'red' }}>{cell}</div>)
        }</div>
        )
      }
    </div>
  )
}

export default function() {
  const [started, setStarted] = useState(false)
  const startGame =()=> {
    setStarted(true)
  }

  return (
    <div>
      {!started  && <button onClick={startGame}>Start game</button>}
      {started && <Tetris />}
    </div>
  )
}
