import listOfDepths, { TreeNode, ListNode } from "../../33_listOfDepths";

describe("listOfDepths", () => {
  test("creates linked lists of nodes at each depth", () => {
    /*
                    1
                   / \
                  2   3
                 / \   \
                4   5   6
               /
              7
        */
    const root: TreeNode<number> = {
      value: 1,
      left: {
        value: 2,
        left: {
          value: 4,
          left: { value: 7 },
        },
        right: { value: 5 },
      },
      right: {
        value: 3,
        right: { value: 6 },
      },
    };

    const expectedLists: ListNode<number>[] = [
      { value: 1 }, // Depth 0: [1]
      { value: 2, next: { value: 3 } }, // Depth 1: [2, 3]
      { value: 4, next: { value: 5, next: { value: 6 } } }, // Depth 2: [4, 5, 6]
      { value: 7 }, // Depth 3: [7]
    ];

    expect(listOfDepths(root)).toEqual(expectedLists);
  });

  test("creates linked lists for single node tree", () => {
    const root: TreeNode<number> = { value: 1 };
    const expectedList: Array<ListNode<number>> = [{ value: 1 }];
    expect(listOfDepths(root)).toEqual(expectedList);
  });
});
