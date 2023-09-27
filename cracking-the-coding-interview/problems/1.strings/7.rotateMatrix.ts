// 7. * Rotate Matrix *: Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, 
// write a method to rotate the image by 90 degrees.
// Can you do this in place ?

// input

// 1 2 3
// 4 5 6
// 7 8 9

// output

// 7 4 1
// 8 5 2
// 9 6 3


const rotateMatrix = (matrix) => {

  const rotatedMatrix = Array.from({ length: matrix.length }, () => Array(matrix.length).fill(0));

  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      const originValue = matrix[row][column]
      rotatedMatrix[column][matrix.length -1 -row] = originValue
    }
  }

  return rotatedMatrix

}

console.log(rotateMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))

// 7 4 1
// 8 5 2
// 9 6 3

const matrix4x4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];

const rotatedMatrix4x4 = rotateMatrix(matrix4x4);
console.log(rotatedMatrix4x4);

// [
//   [13, 9, 5, 1],
//   [14, 10, 6, 2],
//   [15, 11, 7, 3],
//   [16, 12, 8, 4]
// ]