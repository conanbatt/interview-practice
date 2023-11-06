import { useEffect, useState } from "react";
const shapes = [
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
const _board = Array.from({ length: 14 }).map(i => (Array.from({ length: 10 })).map(i => 0));

class Piece {
  x
  y
  shape
  constructor() {
    const rnd = Math.floor(Math.random() * shapes.length)
    this.shape = shapes[rnd]
    this.x = 0
    this.y = Math.floor(_board[0].length / 2) - 1
  }

  isFilled(i, j) {
    const newX = i - this.x
    const newY = j - this.y
    if (newX < 0 || newY < 0 || newX >= this.shape.length || newY >= this.shape[0].length) return false
    return this.shape[newX][newY]
  }
}


const hasColision = (_piece, board) => {
  for (let i = 0; i < _piece.shape.length; i++) {
    for (let j = 0; j < _piece.shape[0].length; j++) {
      const outOfBoard = i + _piece.x >= board.length || j + _piece.y >= board[0].length || i + _piece.x < 0 || j + _piece.y < 0
      if (outOfBoard) return 'out'
      const collision = (_piece.shape[i][j] && board[i + _piece.x][j + _piece.y]) || _piece.x + _piece.shape.length > board.length
      if (collision) {
        if (_piece.x === 0) return 'end'
        return true
      }
    }
  }
  return false
}

const merge = (piece, board) => {
  return [...board.map(i =>[...i])].map((row, ri) => row.map((col, ci) => (piece.isFilled(ri, ci) ? 2 : col)))
}

const rotatePiece = (piece) => {
  const newPiece = new Piece()
  newPiece.x = piece.x
  newPiece.y = piece.y
  const newShape = Array.from({ length: piece.shape[0].length }).map((i) =>
    Array.from({ length: piece.shape.length }).map((i) => 0)
  );
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[0].length; j++) { 
      newShape[j][newShape[j].length - 1 - i] = piece.shape[i][j]
    }
  }
  newPiece.shape = newShape
  return newPiece
}

function Tetris(props) {
  const [board, setBoard] = useState(_board)
  const [piece, setPiece] = useState(() => new Piece())

  const getStyle = (num) => {
    if (num === 0) return {
      background: '#fafafa'
    }
    if (num === 1) return {
      border: '1px solid transparent',
      background: 'linear-gradient(to bottom right, blue, red)'
    }
    return {
      border: '1px solid #555',
      background: 'linear-gradient(to bottom right, black, #CCC)'
    }
  }

  const updateBoard = (piece, board) => {
    const merged = [...merge(piece, board).map(i => [...i])]
    for(let i =0; i < board.length; i++) {
      if(merged[i].every(num => !!num )) {
        merged.splice(i, 1)
        merged.unshift(Array.from({ length: 10 }).map(i => 0))
        props.onClearRow(1)
        i--;
      }
    }
    setBoard(merged)
  }

  useEffect(() => {
    const fn = (e)=> {
      const key = e.key;
      console.log(key)

      if(e.keyCode === 32){
        console.log('spaceeeeeee')

        const newPiece = new Piece()
        newPiece.x = piece.x
        newPiece.y = piece.y
        newPiece.shape = piece.shape
        while (newPiece.x < board.length){
          newPiece.x += 1
          const coli = hasColision(newPiece, board)
          if (coli) {
            if (coli !== 'out') {
              if (coli === 'end') {
                props.onEnd('lost')
              }
              // freeze and create new piece
              newPiece.x = newPiece.x - 1
              updateBoard(newPiece, board)
              setPiece(() => new Piece())
            } else {
              console.log('out')
            }
            return 
          } else {
            
          }
        }
        setPiece(newPiece)
      } else if (key === 'ArrowUp') {
        const newPiece = new Piece()
        newPiece.x = piece.x
        newPiece.y = piece.y
        newPiece.shape = rotatePiece(piece).shape
        const coli = hasColision(newPiece, board)
        if (coli) {
          if (coli !== 'out') {
            if (coli === 'end') {
              props.onEnd()
            }
            // freeze and create new piece
            updateBoard(piece, board)
            setPiece(() => new Piece())
          } else {
            console.log('out')
          }
        } else {
          setPiece(newPiece)
        }
      }
      if (key === 'ArrowDown') {
          const newPiece = new Piece()
          newPiece.x = piece.x
          newPiece.y = piece.y
          newPiece.shape = piece.shape
          newPiece.x += 1
          const coli = hasColision(newPiece, board)
          if (coli) {
            if (coli!=='out') {
              if(coli === 'end') {
                props.onEnd()
              } 
              // freeze and create new piece
              updateBoard(piece, board)
              setPiece( () => new Piece())
            } else {
              console.log('out')
            }
          } else {
            setPiece(newPiece)
          }
      } else if (key === 'ArrowRight') {
          const newPiece = new Piece()
          newPiece.x = piece.x
          newPiece.y = piece.y
          newPiece.shape = piece.shape
          newPiece.y += 1
          const coli = hasColision(newPiece, board)
          if (coli) {
            if (coli!=='out') {
              if(coli === 'end') {
                props.onEnd()
              } 
              // freeze and create new piece
              updateBoard(piece, board)
               setPiece(new Piece())
            } else {
              console.log('out')
            }
          } else {
             setPiece(newPiece)
          }
      } else if (key === 'ArrowLeft') {
          const newPiece = new Piece()
          newPiece.x = piece.x
          newPiece.y = piece.y
          newPiece.shape = piece.shape
          newPiece.y -= 1
          const coli = hasColision(newPiece, board)
          if (coli) {
            if (coli!=='out') {
              if(coli === 'end') {
                props.onEnd()
              } 
              // freeze and create new piece
              updateBoard(piece, board)
               setPiece(new Piece())
            } else {
              console.log('out')
            }
          } else {
             setPiece(newPiece)
          }
      }
    }
    document.addEventListener('keydown', fn)

    const inter = setInterval(()=>{
      const newPiece = new Piece()
      newPiece.x = piece.x
      newPiece.y = piece.y
      newPiece.shape = piece.shape
      newPiece.x += 1
      const coli = hasColision(newPiece, board)
      if (coli) {
        if (coli !== 'out') {
          // freeze and create new piece
            if (coli === 'end') {
              props.onEnd()
            }
          updateBoard(piece, board)
          setPiece(() => new Piece())
        } else {
          console.log('out')
        }
      } else {
        setPiece(newPiece)
      }
    }, 500)

    return () => {
      document.removeEventListener('keydown', fn)
      clearInterval(inter)
    }
  }, [piece, board])

  return (
    <div>
      {board.map((row, ri) => <div>
        {row.map((col, ci) =>
          <div className="cell" key={`${ri}_ ${ci}`} style={getStyle(piece.isFilled(ri, ci) ? 1 : col)}>{piece.isFilled(ri, ci) ? 1 : col}</div>
        )}
      </div>)}
    </div>
  )
}


export default function () {
  const [gameState, setGameState] = useState('initial')
  const [audio, setAudio] = useState()
  const [points, setPoints] = useState(0)
  const [clearRow, setClearRowAudio] = useState()

  const startGame = () => {
    setGameState('play')
    setPoints(0)
    toggleAudio()
  }

  const toggleAudio = () => {
    if (gameState === 'play') {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleClearRow = (rows) => {
    if ((points + (rows * 10)) >= 100) {
      setGameState('win')
      toggleAudio()
    } else {
      setPoints(points + (rows * 10))
      toggleClearRowAudio()
    }
  }

  const toggleClearRowAudio = () => {
      clearRow.play();
      // clearRow.pause();
  };

  useEffect(()=>{
    setAudio(new Audio("/age.mp3"))
    setClearRowAudio(new Audio("/clearRow.mp3"))
  }, [])

  return (
    <div className="main">
      <div className="game">
        {gameState === 'initial' && <h1>Start playing</h1>}
        {gameState === 'lost' && <h1>You lost</h1>}
        {gameState === 'win' && <h1>You won</h1>}
        {gameState === 'play' && <h1>Score: {points}</h1>}
        {gameState !== 'play' && <button onClick={startGame}>Start game</button>}
        {gameState === 'play' && <Tetris onEnd={() => {
          toggleAudio()
          setGameState('lost')
        }} onClearRow={handleClearRow}/>}
      </div>
    </div>
  )
}