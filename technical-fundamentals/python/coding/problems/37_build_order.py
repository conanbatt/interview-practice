# 37. Build Order:
# You are given a list of projects and a list of dependencies (which is a list of pairs
# of projects, where the second project is dependent on the first project). All of a
# project's dependencies must be built before the project is. Find a build order that
# will allow the projects to be built. If there is no valid build order, return an error.
#
# EXAMPLE
# Input:
#   projects: a, b, c, d, e, f
#   dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
# Output: e, f, a, b, d, c



from typing import List, Union

class GraphNode:
    def __init__(self, value: str, neighbors: List["GraphNode"] = None):
        self.value = value
        self.neighbors: List["GraphNode"] = neighbors if neighbors is not None else []

def dfs(node, answer, path):
    if not node:
        return answer

    for n in node.neighbors:
        if n.value not in path and n.value not in answer:
            path.append(n.value)
            dfs(n, answer, path)
            path.pop()
    answer.append(node.value)
    return answer
    

def build_order(
    projects: List[str], dependencies: List[List[str]]
) -> Union[List[str], str]:
    hashmap = {}
    starts = {}
    if not projects and not dependencies:
        return []

    for a in projects:
        n = GraphNode(a)
        hashmap[a] = n
        starts[a] = n

    for left, right in dependencies:
        if right not in hashmap or left not in hashmap:
            raise Exception("No valid build order exists")
        hashmap[right].neighbors.append(hashmap[left])
        if left in starts:
            del starts[left]

    if not starts:
        raise Exception("No valid build order exists")

    dummy = GraphNode('')
    for n in list(starts.values())[::-1]:
        dummy.neighbors.append(n)

    answer = dfs(dummy, [], [])
    print(answer[:-1])
    return [x for x in answer[:-1]]

