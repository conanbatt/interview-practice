// 8. * Zero Matrix *: Write an algorithm such that if an element in an MxN matrix is 0,
//                     its entire row and column are set to 0.

function createObjectWithColumns(columns) {
  const obj = {};
  for (let i = 0; i < columns; i++) {
    obj[i] = 0;
  }
  return obj;
}

const zeroMatrix = (matrix) => {
  const rowLength = matrix.length
  const columnLength = matrix[0].length
  const zeroedMatrix = Array.from({ length: rowLength }, () => Array(columnLength).fill(undefined));
  const rows = createObjectWithColumns(rowLength)
  const columns = createObjectWithColumns(columnLength)

  for (let row = 0; row < rowLength; row++) {
    for (let column = 0; column < columnLength; column++) {
     const valueAtColumnRowI = matrix[row][column]
      if (valueAtColumnRowI === 0) {
        rows[row] = 1
        columns[column] = 1
      }
    }
  }
  for (let row = 0; row < rowLength; row++) {
    for (let column = 0; column < columnLength; column++) {
      if(rows[row] || columns[column]) {
        zeroedMatrix[row][column] = 0
      } else {
        zeroedMatrix[row][column] = matrix[row][column]
      }
    }
  }
  return zeroedMatrix;
}

const matrix1 = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 8, 9]
];

const zeroedMatrix1 = zeroMatrix(matrix1);
console.log(zeroedMatrix1);

// [
//   [1, 0, 3],
//   [0, 0, 0],
//   [7, 0, 9]
// ]

const matrix2 = [
  [1, 0, 3, 4],
  [5, 6, 0, 8],
  [0, 10, 11, 12],
  [13, 14, 15, 0]
];

const zeroedMatrix2 = zeroMatrix(matrix2);
console.log(zeroedMatrix2);

// [
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ]

const matrix3 = [
  [1, 2],
  [3, 4]
];

const zeroedMatrix3 = zeroMatrix(matrix3);
console.log(zeroedMatrix3);

[
  [1, 2],
  [3, 4]
]

const matrix4 = [
  [1, 2, 3],
  [4, 0, 6]
];

const zeroedMatrix4 = zeroMatrix(matrix4);
console.log(zeroedMatrix4);

// [
//   [1, 0, 3],
//   [0, 0, 0]
// ]