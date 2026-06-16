# 42. Robot in a Grid:
# Imagine a robot sitting on the upper left corner of a grid with r rows and c columns.
# The robot can only move in two directions, right and down, but certain cells are
# "off limits" such that the robot cannot step on them.
# Design an algorithm to find a path for the robot from the top left to the bottom right.

from typing import List, Tuple, Union

Grid = List[List[bool]]
Path = List[Tuple[int, int]]


def robot_in_a_grid(grid: Grid) -> Union[Path, bool]:
    pass
