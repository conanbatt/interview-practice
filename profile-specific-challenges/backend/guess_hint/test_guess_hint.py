import pytest

from guess_hint import GuessHint

def test_1():
    solution = GuessHint()
    assert "WWWW" == solution.getHint("ABCD", "ABCD")

def test_2():
    solution = GuessHint()
    assert "RRRR" == solution.getHint("ABCD", "DCBA")

def test_3():
    solution = GuessHint()
    assert "WWRR" == solution.getHint("ABAA", "BAAA")

def test_4():
    solution = GuessHint()
    assert "W" == solution.getHint("ABCD", "AAAA")

def test_5():
    solution = GuessHint()
    assert "" == solution.getHint("ABCD", "EFGH")

def test_6():
    solution = GuessHint()
    assert "WWR" == solution.getHint("AABB", "AAAB")

def test_7():
    solution = GuessHint()
    assert "WR" == solution.getHint("ABCD", "ACAA")

def test_8():
    solution = GuessHint()
    assert "WWRR" == solution.getHint("AAAA", "ABBA")

def test_9():
    solution = GuessHint()
    assert "RR" == solution.getHint("ABCD", "CDAA")

def test_10():
    solution = GuessHint()
    assert "WRR" == solution.getHint("ABCD", "ADBC") 