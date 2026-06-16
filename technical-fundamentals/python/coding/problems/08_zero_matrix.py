# 8. Zero Matrix:
# Write an algorithm such that if an element in an MxN matrix is 0,
# its entire row and column are set to 0.

from typing import List

Matrix = List[List[int]]


def zero_matrix(matrix: Matrix) -> None:
    first_row = False
    first_column = False
    print(matrix)
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == 0:
                if i == 0:
                    first_row = True
                if j == 0:
                    first_column = True
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    for i in range(1, len(matrix)):
        for j in range(1, len(matrix[i])):
            if matrix[i][0] == 0:
                matrix[i][j] = 0
            if matrix[0][j] == 0:
                matrix[i][j] = 0

    if first_row:
        for j in range(len(matrix[0])):
            matrix[0][j] = 0
    if first_column:
        for i in range(len(matrix)):
            matrix[i][0] = 0

