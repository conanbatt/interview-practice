// 7. *Rotate Matrix*:

// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

type Matrix = number[][]

export default function rotateMatrix (matrix: Matrix) {
    const transform = matrix.map((col, indexCol) => col.map((_, indexRow) => matrix[indexRow][indexCol]));
    return transform.map((row) => row.reverse());
}