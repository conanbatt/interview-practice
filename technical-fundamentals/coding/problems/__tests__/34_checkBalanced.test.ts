import checkBalanced, { TreeNode } from "../34_checkBalanced";

describe('checkBalanced', () => {
    test('returns true for a balanced tree', () => {
        /*
            Balanced tree:
                 1
                / \
               2   3
              / \ / \
             4  5 6  7
        */
        const root: TreeNode<number> = {
            value: 1,
            left: {
                value: 2,
                left: { value: 4 },
                right: { value: 5 }
            },
            right: {
                value: 3,
                left: { value: 6 },
                right: { value: 7 }
            }
        };
        expect(checkBalanced(root)).toBe(true);
    });

    test('returns false for an unbalanced tree', () => {
        /*
            Unbalanced tree:
                 1
                /
               2
              /
             3
            /
           4
        */
        const root: TreeNode<number> = {
            value: 1,
            left: {
                value: 2,
                left: {
                    value: 3,
                    left: { value: 4 }
                }
            }
        };
        expect(checkBalanced(root)).toBe(false);
    });

    test('returns true for an empty tree', () => {
        const root: TreeNode<number> | null = null;
        expect(checkBalanced(root)).toBe(true);
    });
});
