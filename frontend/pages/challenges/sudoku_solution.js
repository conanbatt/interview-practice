import { useState } from "react"

export default function Sudoku() {
  const [board, setBoard] = useState(() => {
    const initialBoard = Array(9).fill([]);
    return initialBoard.map(() => Array(9).fill(null));
  });
  const clearBoard = () => setBoard(Array(9).fill(Array(9).fill()));

  const updateBoard = (i, j, value) => {
    const newBoard = board.map(row => [...row]);
    newBoard[i][j] = value;
    setBoard(newBoard);
  };

  const validateSubgrid = (i1,j1, value) => {
    if(!(value > 0 && value < 10)) return false;
    const subgridColumn = Math.floor(i1 / 3)
    const subgridRow = Math.floor(j1 / 3)

    for (let i = subgridColumn * 3; i < subgridColumn * 3 + 3; i++) {
      for (let j = subgridRow * 3; j < subgridRow * 3 + 3; j++) {
        if(board[i][j] === value){
          console.error(`value ${value} is in subgrid ${subgridColumn} - ${subgridRow}`);
          return false;
        }
      }
    }
    return true
  }

  return(
    <>
    <div style={{position: 'absolute', margin:'auto', width: 235, height: 330, left:0, right:0, top:0, bottom: 0}}>
        {board.map((column, index_i) => <div key={`c_${index_i}`} className="row">
          {column.map((row, index_j) => <input key={`r_${index_j}${row}`} className="box" type="number" value={row}
          onChange={(e) => updateBoard(index_i, index_j, +e.target.value)}
          onKeyDown={(e) => {
            if (!validateSubgrid(index_i, index_j, +e.key)) {
              e.preventDefault();
            }
          }}/>)}
      </div>)}
    </div>
    <button onClick={clearBoard}>Clear board</button>
    </>
  )
}
