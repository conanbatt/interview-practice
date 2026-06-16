# 7. Rotate Matrix:
# Given an image represented by an NxN matrix, where each pixel in the image is 4
# bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

from typing import List

Matrix = List[List[int]]

# 1, "2", 3, 4
# 5, 6, 7, "8"
# "9", 10, 11, 12
# 13, 14, "15", 16
# 
# 0, 1 - 1, 3 - 3, 2 - 2, 0

def rotate_matrix(matrix: Matrix) -> None:
    n = len(matrix)
    for i in range(n//2):
        for j in range(i, n - i - 1):
            first = matrix[i][j]
            second = matrix[j][n-i-1]
            third = matrix[n-i-1][n-j-1]
            fourth = matrix[n-j-1][i]
            matrix[i][j] = fourth
            matrix[j][n-i-1] = first
            matrix[n-i-1][n-j-1] = second
            matrix[n-j-1][i] = third