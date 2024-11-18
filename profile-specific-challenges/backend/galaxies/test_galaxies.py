import pytest

from galaxies import Solution

def test_1():
    solution = Solution()
    assert 1 == solution.count([0, 1],
                               [0, 1])

def test_2():
    solution = Solution()
    assert 2 == solution.count([0, 0, 2, 2, 2, 2],
                               [1, 3, 0, 1, 3, 4])

def test_3():
    solution = Solution()
    assert 3 == solution.count([0, 1, 10, 10],
                               [0, 1, 0, 1])

def test_4():
    solution = Solution()
    assert 3 == solution.count([47, 10, 11, 12, 13, 15, 14],
                               [47, 42, 42, 42, 42, 42, 42])

def test_5():
    solution = Solution()
    assert 0 == solution.count([0, 1, 2, 3, 4, 5, 6, 7],
                               [0, 1, 4, 9, 16, 25, 36, 49])

def test_6():
    solution = Solution()
    assert 2 == solution.count([0, 0, 10, 10],
                               [0, 10, 0, 10])
    
def test_7():
    solution = Solution()
    assert 14 == solution.count([0,0,0,0,0,0,0,0,0,0],
                                [0,1,2,3,4,5,6,7,8,9])

def test_8():
    solution = Solution()
    assert 5 == solution.count([0,0,0,0,0,1,1,1,1,1],
                               [0,1,2,3,4,0,1,2,3,4])
    