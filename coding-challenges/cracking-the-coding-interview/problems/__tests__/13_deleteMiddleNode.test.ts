import deleteMiddleNode, { Node } from "../13_deleteMiddleNode";

describe('deleteMiddleNode', () => {
    test('does nothing if node is undefined', () => {
        const result: Node<number> | undefined = undefined;
        deleteMiddleNode(result);
        expect(result).toBeUndefined();
    });

    test('does nothing if node is the last node', () => {
        const node1: Node<number> = { value: 1 };
        const result = deleteMiddleNode(node1);
        expect(result).toBeUndefined();
    });

    test('deletes middle node', () => {
        // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5
        const node1: Node<number> = { value: 1 };
        const node2: Node<number> = { value: 2 };
        const node3: Node<number> = { value: 3 };
        const node4: Node<number> = { value: 4 };
        const node5: Node<number> = { value: 5 };
        node1.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;

        // Delete node3 (middle node)
        deleteMiddleNode(node3);

        // Resulting list should be: 1 -> 2 -> 4 -> 5
        expect(node1.next).toEqual(node2);
        expect(node2.next).toEqual(node4);
        expect(node4.next).toEqual(node5);
        expect(node5.next).toBeUndefined();
    });

    test('deletes middle node with multiple nodes', () => {
        // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> 6
        const node1: Node<number> = { value: 1 };
        const node2: Node<number> = { value: 2 };
        const node3: Node<number> = { value: 3 };
        const node4: Node<number> = { value: 4 };
        const node5: Node<number> = { value: 5 };
        const node6: Node<number> = { value: 6 };
        node1.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;
        node5.next = node6;

        // Delete node4 (middle node)
        deleteMiddleNode(node4);

        // Resulting list should be: 1 -> 2 -> 3 -> 5 -> 6
        expect(node1.next).toEqual(node2);
        expect(node2.next).toEqual(node3);
        expect(node3.next).toEqual(node5);
        expect(node5.next).toEqual(node6);
        expect(node6.next).toBeUndefined();
    });
});
