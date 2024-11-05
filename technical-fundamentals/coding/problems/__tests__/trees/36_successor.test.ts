import successor, { TreeNode } from "../../36_successor";

describe("successor", () => {
  test("returns correct in-order successor", () => {
    /*
                    5
                   / \
                  3   7
                 / \ / \
                2  4 6  8
        */
    const node2: TreeNode<number> = { value: 2 };
    const node4: TreeNode<number> = { value: 4 };
    const node6: TreeNode<number> = { value: 6 };
    const node8: TreeNode<number> = { value: 8 };

    const node3: TreeNode<number> = { value: 3, left: node2, right: node4 };
    const node7: TreeNode<number> = { value: 7, left: node6, right: node8 };
    const node5: TreeNode<number> = { value: 5, left: node3, right: node7 };

    node2.parent = node3;
    node4.parent = node3;
    node3.parent = node5;

    node6.parent = node7;
    node8.parent = node7;
    node7.parent = node5;

    // Successors
    expect(successor(node2)?.value).toBe(3);
    expect(successor(node3)?.value).toBe(4);
    expect(successor(node4)?.value).toBe(5);
    expect(successor(node5)?.value).toBe(6);
    expect(successor(node6)?.value).toBe(7);
    expect(successor(node7)?.value).toBe(8);
    expect(successor(node8)).toBeUndefined();
  });

  test("returns undefined for node without successor", () => {
    const node1: TreeNode<number> = { value: 1 };
    expect(successor(node1)).toBeUndefined();
  });
});
