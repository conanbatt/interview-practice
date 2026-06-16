# 39. BST Sequences:
# A binary search tree was created by traversing through an array from left to right
# and inserting each element. Given a binary search tree with distinct elements,
# print all possible arrays that could have led to this tree.
#
# EXAMPLE
# Input:
#       2
#      / \
#     1   3
# Output: [[2, 1, 3], [2, 3, 1]]

from __future__ import annotations
from typing import TypeVar, Generic, Optional, List

T = TypeVar("T")

#       5
#   3        7
# 2   4   6    8


# root = TreeNode(5,
#             left=TreeNode(3, left=TreeNode(2), right=TreeNode(4)),
#             right=TreeNode(7, left=TreeNode(6), right=TreeNode(8)),
#         )

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

def total_nodes(root: TreeNode[T] | None):
    if not root:
        return 0

    return total_nodes(root.left) + total_nodes(root.right) + 1


def backtrack(total, choices, path, answer):
    if len(path) == total:
        answer.append(list(path))
        return answer

    for i in range(len(choices)):
        c = choices[i]
        if c.value not in path:
            path.append(c.value)
            new_choices = choices[:i] + choices[i+1:]
            if c.left:
                new_choices.append(c.left)
            if c.right:
                new_choices.append(c.right)

            backtrack(total, new_choices, path, answer)
            path.pop()

    return answer

def bst_sequences(root: TreeNode[T]) -> List[List[T]]:
    total = total_nodes(root)
    return backtrack(total, [root], [], [])
    