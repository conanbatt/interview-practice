import minimalTree, { TreeNode } from "../../32_minimalTree";

describe('minimalTree', () => {
    test('creates minimal height BST from sorted array', () => {
        const sortedArray = [1, 2, 3];
        const expectedTree: TreeNode<number> = {
            value: 2,
            left: { value: 1 },
            right: { value: 3 }
        };
        expect(minimalTree(sortedArray)).toEqual(expectedTree);
    });

    test('creates minimal height BST from sorted array 5 length', () => {
        const sortedArray = [1, 2, 3, 4, 5];
        const expectedTree: TreeNode<number> = {
            value: 3,
            left: {
                left: {
                    value: 1,
                },
                value: 2,
            },
            right: {
                left: {
                    value: 4,
                },
                value: 5,
            },
        }
        expect(minimalTree(sortedArray)).toEqual(expectedTree);
    });

    test('creates minimal height BST from sorted array 7 length', () => {
        const sortedArray = [1, 2, 3, 4, 5, 6, 7];
        const expectedTree: TreeNode<number> = {
            value: 4,
            left: {
                value: 2,
                left: {
                    value: 1,
                },
                right: {
                    value: 3,
                },
            },
            right: {
                value: 6,
                left: {
                    value: 5,
                },
                right: {
                    value: 7,
                },
            },
        }
        expect(minimalTree(sortedArray)).toEqual(expectedTree);
    });

    test('returns toBeUndefined for empty array', () => {
        const sortedArray: number[] = [];
        expect(minimalTree(sortedArray)).toBeUndefined();
    });
});
