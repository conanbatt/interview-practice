import pytest

from on_call_schedule import Solution

def test1():
    solution = Solution()
    assert [(10, 30, ["Anna"]), 
            (30, 80, ["Anna", "Juan"]), 
            (80, 100, ["Anna"])] == solution.createOnCallSchedule({
                "Anna": (10, 100),
                "Juan": (30, 80)
            })

def test2():
    solution = Solution()
    assert [(50, 60, ["Ben"]),
            (60, 70, ["Ben", "Carla"]),
            (70, 120, ["Carla"]),
            (150, 300, ["David"])] == solution.createOnCallSchedule({
                "Ben": (50, 70),
                "Carla": (60, 120),
                "David": (150, 300)
            })

def test3():
    solution = Solution()
    assert [(0, 50, ["Alice", "Bob"])] == solution.createOnCallSchedule({
                "Alice": (0, 50),
                "Bob": (0, 50)
            })

def test4():
    solution = Solution()
    assert [(10, 20, ["Alice"]),
            (30, 40, ["Bob"]),
            (50, 60, ["Charlie"])] == solution.createOnCallSchedule({
                "Alice": (10, 20),
                "Bob": (30, 40),
                "Charlie": (50, 60)
            })

def test5():
    solution = Solution()
    assert [(0, 10, ["Alice"]),
            (10, 20, ["Alice", "Bob"]),
            (20, 30, ["Alice", "Bob", "Charlie"]),
            (30, 40, ["Bob", "Charlie"]),
            (40, 50, ["Charlie"])] == solution.createOnCallSchedule({
                "Alice": (0, 30),
                "Bob": (10, 40),
                "Charlie": (20, 50)
            })

def test6():
    solution = Solution()
    assert [(100, 200, ["Alice"])] == solution.createOnCallSchedule({
                "Alice": (100, 200)
            })
