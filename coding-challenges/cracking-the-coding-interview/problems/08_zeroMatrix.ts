// 8. *Zero Matrix*:

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

type Matrix = number[][];

export default function zeroMatrix(matrix: Matrix) {
  const coords = new Set<[number, number]>();

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) coords.add([row, col]);
    }
  }

  for (let [row, col] of coords.values()) {
    matrix[row].fill(0);

    for (let r = 0; r < matrix.length; r++) {
      matrix[r][col] = 0;
    }
  }

  return matrix;
}
