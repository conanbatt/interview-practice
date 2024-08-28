// 7. *Rotate Matrix*:

// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
// const matrix = [
//       [1, 2],
//       [3, 4],
//     ];
//     const expected = [
//       [3, 1],
//       [4, 2],
//     ];
// 0, 0 : 0, 1 -> 0, 1 : 1, 1
// 1 2 3
// 4 5 6
// 7 8 9
type Matrix = number[][];

export default function rotateMatrix(matrix: Matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = row; col < matrix[row].length; col++) {
      const tmp = matrix[row][col];
      matrix[row][col] = matrix[col][row];
      matrix[col][row] = tmp;
    }

    matrix[row].reverse();
  }
}
