// 8. *Zero Matrix*:

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

type Matrix = number[][]

export default function zeroMatrix (matrix: Matrix) {

    let setRow: Set<number> = new Set();
    let setCol: Set<number> = new Set();
    for(let i = 0; i < matrix[0].length; i++){
        for(let j= 0; j < matrix.length; j++){
            if(matrix[i][j] === 0 && !setRow.has(i) && !setCol.has(j)){
                fillRow(i, matrix[0].length, matrix);
                fillCol(j, matrix.length, matrix);
                setRow.add(i);
                setCol.add(j);
            }
        }
    }

}

export function fillCol(col:number, mlength: number, matrix: Matrix){
    for(let i = 0; i < mlength; i++){
        matrix[i][col] = 0;
    }
}

export function fillRow(row:number, mlength: number, matrix: Matrix){
    for(let j = 0; j < mlength; j++){
        matrix[row][j] = 0;
    }
}