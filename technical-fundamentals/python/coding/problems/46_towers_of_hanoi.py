# 46. Towers of Hanoi:
# In the classic problem of the Towers of Hanoi, you have 3 towers and N disks of
# different sizes which can slide onto any tower. The puzzle starts with disks sorted
# in ascending order of size from top to bottom (i.e., each disk sits on top of an
# even larger one).
#
# Constraints:
# - Only one disk can be moved at a time.
# - A disk is slid off the top of one tower onto another tower.
# - A disk cannot be placed on top of a smaller disk.
#
# Write a program to move the disks from the first tower to the last using stacks.

from typing import List, Tuple

Tower = List[int]


def towers_of_hanoi(n: int) -> Tuple[Tower, Tower, Tower]:
    pass
