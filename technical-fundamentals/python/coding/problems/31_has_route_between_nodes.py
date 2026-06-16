# 31. Route Between Nodes:
# Given a directed graph, design an algorithm to find out whether there is a route
# between two nodes.

from __future__ import annotations
from typing import List


class GraphNode:
    def __init__(self, value: int, neighbors: List["GraphNode"] = None):
        self.value = value
        self.neighbors: List["GraphNode"] = neighbors if neighbors is not None else []

def backtrack(start, end, path):
    if start == end:
        return True

    if not start or not end:
        return False

    for n in start.neighbors:
        if n not in path:
            path.append(n)
            if backtrack(n, end, path):
                return True

    return False 

def has_route_between_nodes(start: GraphNode, end: GraphNode) -> bool:
    return backtrack(start, end, [])
