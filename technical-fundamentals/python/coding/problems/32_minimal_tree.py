# 32. Minimal Tree:
# Given a sorted (increasing order) array with unique integer elements, write an
# algorithm to create a binary search tree with minimal height.
#
# A binary search tree is a search where for each node, lesser elements are on
# the left node, and greater elements on the right node.
#
# Input: [1,2,3,4,5,6,7,8]
# Output:
#      5
#   2  |  7
# 1   3|6   8

from __future__ import annotations
from typing import TypeVar, Generic, Optional, List

T = TypeVar("T")


class TreeNode(Generic[T]):
    def __init__(
        self,
        value: T,
        left: Optional["TreeNode[T]"] = None,
        right: Optional["TreeNode[T]"] = None,
    ):
        self.value = value
        self.left = left
        self.right = right


def minimal_tree(sorted_array: List[T]) -> Optional[TreeNode[T]]:
    if not sorted_array:
        return None

    len_array = len(sorted_array)
    middle = len_array // 2
    root = TreeNode(sorted_array[middle])
    root.left = minimal_tree(sorted_array[0:middle])
    root.right = minimal_tree(sorted_array[middle+1:])
    return root
