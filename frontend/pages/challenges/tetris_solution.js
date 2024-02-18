import { useEffect, useState } from "react";

// board
// piece
  //  position
  //  shape
  //  move
  //  rotate
// game
//    time goes down piece


//    clear line
const BOARD_X = 10
const BOARD_Y = 14
const SHAPES = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1],
    [1],
    [1],
    [1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];

const initialBoard = Array(BOARD_Y).fill('').map(()=> Array(BOARD_X).fill(0))

export default function Tetris() {
  const [board, setBoard] = useState(initialBoard)
  const [shape, setShape] = useState(SHAPES[Math.floor(Math.random() * SHAPES.length)])
  const [position, setPosition] = useState({x: 0, y: 4})

  function drawBoard ({board, shape, position, fixed}) {
    const newBoard = Array(BOARD_Y).fill('').map(() => Array(BOARD_X).fill(0))

    for(let i = 0; i< board.length; i++){
      for (let j = 0; j < board[0].length; j++) {
        const boardVal = board[i][j]
        const px = i - position.x
        const py = j - position.y
        let pieceVal
        
        if(px>=0 && py >= 0 && px < shape.length && py < shape[0].length) {
          pieceVal= shape[px][py]
        }
        newBoard[i][j] = pieceVal ? fixed ? 2: 1 : boardVal
      }
    }

    return newBoard
  }

  function isValid({ x, y, shape }) {
    const boardValid = x >= 0 && y >= 0 && x + shape.length <= board.length && y + shape[0].length <= board[0].length

    if (boardValid) {
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[0].length; j++) {
          const pv = shape[i][j]
          if(pv) {
            const boardX = i + x
            const boardY = j + y
            if (boardX >= 0 && boardY >= 0 &&
              boardX < board.length &&
              boardY < board[0].length) {
                if(board[boardX][boardY]) {
                  return false
                }
              }
          }
        }
      }
      return true
    }
    return false
  }

  function clearLine ({board}) {
    const ub = []
    let count = 0

    for(let i = 0 ; i<board.length; i++) {
      if(board[i].every(cell => !!cell)) {
        count++
      } else {
        ub.push(board[i])
      }
    }

    return (Array(count).fill('').map(() => Array(BOARD_X).fill(0)).concat(ub))
  }

  function rotate() {
    const px = position.x
    const py = position.y

    const newShape = Array(shape[0].length).fill('').map(()=> Array(shape.length))

    for (let i = 0; i < newShape.length; i++) {
      for (let j = 0; j < newShape[0].length; j++) {
        newShape[i][j] = shape[j][shape[0].length -1 -i]
    }}

    if (!isValid({ x: px, y: py, shape: newShape })) {
      return
    }

    setShape(newShape)
  }

  function fixBoard () {
    const newBoard = drawBoard({ board, shape, position, fixed: true })
    setBoard(clearLine({ board: newBoard }))
  }

  function move ({dx, dy}={}) {
    const mdx = dx ?? 0
    const mdy = dy ?? 0
    const px = position.x + mdx
    const py = position.y + mdy

    if(!isValid({x: px, y : py, shape})) {
      if(dx === 1) {
        fixBoard()
        setPosition({
          x:0,
          y: 4
        })
        setShape(SHAPES[Math.floor(Math.random() * SHAPES.length)])
      }
      return
    }

    setPosition({
      x: px,
      y: py,
    })
  }


  useEffect(()=> {
    function handleMove (e) {
      const key = e.key

      if(key === 'ArrowUp') {
        rotate()
      }
      if(key === 'ArrowRight') {
        move({dx: 0 , dy : 1})
      }
      if(key === 'ArrowDown') {
        move({dx: 1 , dy : 0})
      }
      if(key === 'ArrowLeft') {
        move({dx: 0 , dy : -1})
      }
    }
  
    document.addEventListener('keydown', handleMove)
    return () => document.removeEventListener('keydown', handleMove)
  }, [shape, position, board])

  useEffect(() => {
    const t = setInterval(() => move({ dx: 1, dy: 0 }),500)
    return () => clearInterval(t)
  }, [shape, position, board])

  const cellStyle = (cell) => ({
    backgroundColor: cell === 1? 'green' : cell === 2 ? 'brown' : '',
  })

  return(
    <>
      {drawBoard({ board, shape, position }).map((row, ri) => <div className="row" key={ri}>
        {row.map((cell, ci) => <div className="cell" style={cellStyle(cell)} key={ci}>
        </div>)}
      </div>)}
    </>
  )
}
