# 30. Write the basic tree algorithms of Depth-First Search and Breadth-First Search.

from __future__ import annotations
from typing import TypeVar, Generic, Optional, Callable

T = TypeVar("T")


class TreeNode(Generic[T]):
    def __init__(
        self,
        value: T,
        left: Optional["TreeNode[T]"] = None,
        right: Optional["TreeNode[T]"] = None,
        parent: Optional["TreeNode[T]"] = None,
    ):
        self.value = value
        self.left = left
        self.right = right
        self.parent = parent


class Tree(Generic[T]):
    def backtrack(self, node, answer):
        if not node:
            return answer

        to_track = []
        for n in [node.left, node.right]:
            if n:
                answer.append(n)
                to_track.append(n)

        for n in to_track:
            self.backtrack(n, answer)

        return answer

    def bfs(
        self,
        node: Optional[TreeNode[T]],
        visit: Callable[[TreeNode[T]], None],
    ) -> None:
        if node:
            nodes = []
            nodes.append(node)
            self.backtrack(node, nodes)
            while nodes:
                visit(nodes.pop(0))

    def dfs(
        self,
        node: Optional[TreeNode[T]],
        visit: Callable[[TreeNode[T]], None],
    ) -> None:
        if node:
            visit(node)
            self.dfs(node.left, visit)
            self.dfs(node.right, visit)
            
