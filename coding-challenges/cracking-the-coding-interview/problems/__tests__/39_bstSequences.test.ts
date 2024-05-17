import bstSequences, { TreeNode } from "../39_bstSequences";

const createNode = <T>(value: T, left?: TreeNode<T>, right?: TreeNode<T>): TreeNode<T> => {
    return { value, left, right };
};
describe('bstSequences', () => {
    test('returns correct sequences for valid input', () => {
        /*
                    2
                   / \
                  1   3
        */
        const root1: TreeNode<number> = createNode(2,
            createNode(1),
            createNode(3)
        );
        expect(bstSequences(root1)).toEqual([[2, 1, 3], [2, 3, 1]]);
    });

    test('returns correct sequences for valid input', () => {

        /*
                    5
                   / \
                  3   7
                 / \ / \
                2  4 6  8
        */

        const root2: TreeNode<number> = createNode(5,
            createNode(3,
                createNode(2),
                createNode(4)),
            createNode(7,
                createNode(6),
                createNode(8))
        );
        expect(bstSequences(root2)).toEqual([
            [5, 3, 7, 2, 4, 6, 8],
            [5, 3, 7, 2, 6, 4, 8],
            [5, 3, 7, 4, 2, 6, 8],
            [5, 3, 7, 4, 6, 2, 8],
            [5, 7, 3, 2, 4, 6, 8],
            [5, 7, 3, 2, 6, 4, 8],
            [5, 7, 3, 4, 2, 6, 8],
            [5, 7, 3, 4, 6, 2, 8]
        ]);
    });
});
