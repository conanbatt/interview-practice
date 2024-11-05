import hasRouteBetweenNodes, { GraphNode } from "../../31_hasRouteBetweenNodes";

describe("hasRouteBetweenNodes", () => {
  test("has route between connected nodes", () => {
    /*
            Graph:
            1 -> 2 -> 3 -> 4
            |         |
            5         6
        */
    const node1: GraphNode = { value: 1, neighbors: [] };
    const node2: GraphNode = { value: 2, neighbors: [] };
    const node3: GraphNode = { value: 3, neighbors: [] };
    const node4: GraphNode = { value: 4, neighbors: [] };
    const node5: GraphNode = { value: 5, neighbors: [] };
    const node6: GraphNode = { value: 6, neighbors: [] };

    node1.neighbors = [node2, node5];
    node2.neighbors = [node3];
    node3.neighbors = [node4, node6];
    node6.neighbors = [node3]; // Add a back edge for cycle

    expect(hasRouteBetweenNodes(node1, node4)).toBe(true);
    expect(hasRouteBetweenNodes(node4, node1)).toBe(false); // No reverse route
    expect(hasRouteBetweenNodes(node2, node5)).toBe(false); // No direct route
    expect(hasRouteBetweenNodes(node1, node6)).toBe(true); // Route via node 3
  });

  test("no route between disconnected nodes", () => {
    /*
            Graph:
            1   2   3
            |___|___|
        */
    const node1: GraphNode = { value: 1, neighbors: [] };
    const node2: GraphNode = { value: 2, neighbors: [] };
    const node3: GraphNode = { value: 3, neighbors: [] };

    expect(hasRouteBetweenNodes(node1, node2)).toBe(false); // Disconnected nodes
    expect(hasRouteBetweenNodes(node2, node3)).toBe(false); // Disconnected nodes
    expect(hasRouteBetweenNodes(node1, node3)).toBe(false); // Disconnected nodes
  });

  test("no route between non-existing nodes", () => {
    const node1: GraphNode = { value: 1, neighbors: [] };
    const node2: GraphNode = { value: 2, neighbors: [] };

    expect(hasRouteBetweenNodes(node1, node2)).toBe(false); // Non-existing nodes
  });
});
