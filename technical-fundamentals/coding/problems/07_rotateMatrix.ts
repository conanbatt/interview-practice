// 7. *Rotate Matrix*:

// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

type Matrix = number[][]

export default function rotateMatrix (matrix: Matrix) {

    for(let i = 0; i < matrix.length; i++){
        for(let j = i; j < matrix.length; j++){
            const aux = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = aux;
        }
    }

    for(let i = 0; i < matrix.length; i++){
        matrix[i].reverse();
    }

}
