import { useEffect, useState } from "react";

const ROWS = 20;
const COLS = 10;

function cellStyles(cell) {
  return {
    "--size": "20px",
    "--bg-0": "black",
    "--bg-1": "hotpink",
    "--bg-2": "navyblue",
    border: "1px solid white",
    width: "var(--size)",
    height: "var(--size)",
    backgroundColor: `var(--bg-${cell})`,
  };
}

// board[row * ROWS + col]
class Tetris {
  constructor() {
    this.gameOver = false;
    this.board = new Array(ROWS * COLS).fill(0);
    this.pieces = [
      [[1, 1, 1, 1]],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
    ];
    this.currentPiece = this.generatePiece();
  }

  generatePiece() {
    const newPiece =
      this.pieces[Math.floor(Math.random() * this.pieces.length)];
    const x = COLS / 2 - Math.floor(newPiece[0].length / 2);
    const y = 0;

    const piece = {
      x,
      y,
      shape: newPiece,
    };

    if (!this.checkCollisions({ piece })) {
      console.log("SHOULD END GAME");
      this.gameOver = true;
    }

    for (let row = 0; row < newPiece.length; row++) {
      for (let col = 0; col < newPiece[row].length; col++) {
        this.board[(row + y) * COLS + (col + x)] = newPiece[row][col];
      }
    }

    return piece;
  }

  movePiece({ dx = 0, dy = 0 } = {}) {
    this.currentPiece.x = this.currentPiece.x + dx;
    this.currentPiece.y = this.currentPiece.y + dy;

    for (let row = 0; row < this.currentPiece.shape.length; row++) {
      for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
        this.board[
          (row + this.currentPiece.y) * COLS + (col + this.currentPiece.x)
        ] =
          this.board[
            (row + this.currentPiece.y) * COLS + (col + this.currentPiece.x)
          ] === 2
            ? 2
            : this.currentPiece.shape[row][col];
      }
    }
  }

  removeOldPiece() {
    for (let row = 0; row < this.currentPiece.shape.length; row++) {
      for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
        this.board[
          (row + this.currentPiece.y) * COLS + (col + this.currentPiece.x)
        ] = 0;
      }
    }
  }

  stickPiece() {
    for (let row = 0; row < this.currentPiece.shape.length; row++) {
      for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
        this.board[
          (row + this.currentPiece.y) * COLS + (col + this.currentPiece.x)
        ] =
          this.board[
            (row + this.currentPiece.y) * COLS + (col + this.currentPiece.x)
          ] === 1
            ? 2
            : this.board[
                (row + this.currentPiece.y) * COLS + (col + this.currentPiece.x)
              ];
      }
    }
  }

  checkYCollision({ dy = 0, dx = 0, piece = this.currentPiece } = {}) {
    if (piece.y + dy + piece.shape.length > ROWS) return false;

    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (
          piece.shape[row][col] !== 0 &&
          this.board[(row + piece.y + dy) * COLS + (col + piece.x + dx)] === 2
        ) {
          return false;
        } else {
          console.log(
            this.board[(row + piece.y + dy) * COLS + (col + piece.x + dx)]
          );
        }
      }
    }

    return true;
  }

  checkAndRemoveLines() {
    for (let row = 0; row < ROWS; row++) {
      let sum = 0;
      for (let col = 0; col < COLS; col++) {
        sum = sum + this.board[row * COLS + col];
      }

      if (sum === 20) {
        for (let col = 0; col < COLS; col++) {
          this.board[row * COLS + col] = 0;
        }
      }
    }
  }

  rotatePiece() {
    const newShape = new Array(this.currentPiece.shape[0].length)
      .fill([])
      .map(() => new Array(this.currentPiece.shape.length).fill(0));

    for (let row = 0; row < this.currentPiece.shape.length; row++) {
      for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
        newShape[col][this.currentPiece.shape.length - row - 1] =
          this.currentPiece.shape[row][col];
      }
    }

    this.removeOldPiece();
    this.currentPiece.shape = newShape;
    this.move();
  }

  checkCollisions({ dx = 0, dy = 0, piece = this.currentPiece } = {}) {
    if (piece.x + dx < 1 || piece.x + dx + piece.shape[0].length > COLS) {
      console.log("PIECE GOING OUTSIDE OF X BOUNDS");
      return false;
    }
    if (piece.y + dy + piece.shape.length > ROWS) {
      console.log("PIECE GOING OUTSIDE OF Y BOUNDS");
      return false;
    }

    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col] !== 0) {
          if (
            this.board[(row + piece.y + dy) * COLS + (col + piece.x + dx)] === 2
          ) {
            console.log("COLLIDED WITH CELL");

            return false;
          }
        }
      }
    }

    return true;
  }

  move({ dx = 0, dy = 0 } = {}) {
    // check collisions x
    // if (
    //   this.currentPiece.x + dx > -1 &&
    //   this.currentPiece.x + this.currentPiece.shape[0].length + dx < COLS + 1
    // ) {
    //   this.removeOldPiece();
    //   this.movePiece({ dx });
    // }

    // check collisions
    if (this.checkCollisions({ dy, dx })) {
      this.removeOldPiece();
      this.movePiece({ dy, dx });
    } else {
      this.stickPiece();
      this.checkAndRemoveLines();
      this.currentPiece = this.generatePiece();
    }
  }
}

const tetris = new Tetris();

export default function TetrisComponent() {
  const [_, render] = useState();
  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.key) {
        case "ArrowUp":
          tetris.rotatePiece();
          break;
        case "ArrowLeft":
          tetris.move({ dx: -1 });
          break;
        case "ArrowRight":
          tetris.move({ dx: 1 });
          break;
        case "ArrowDown":
          tetris.move({ dy: 1 });
          break;

        default:
          break;
      }

      render({});
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      tetris.move({ dy: 1 });
      render({});
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (tetris.gameOver) {
    return (
      <div>
        <h1>Game over</h1>
      </div>
    );
  }

  return (
    <>
      <h1>Tetris</h1>
      <p>Build a Tetris Game (as far as you can take it)</p>
      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/M8fqHaJU_cc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe> */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
          gridTemplateRows: `repeat(${ROWS}, 20px)`,
        }}
      >
        {tetris.board.map((cell, idx) => (
          <div key={idx} style={cellStyles(cell)} />
        ))}
      </div>
    </>
  );
}
