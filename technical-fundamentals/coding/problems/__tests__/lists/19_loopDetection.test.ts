import loopDetection, { Node } from "../../19_loopDetection";

describe('loopDetection', () => {
    test('returns null if the list has only one node', () => {
        const node: Node<number> = { value: 1 };
        const result = loopDetection(node);
        expect(result).toBeNull();
    });

    test('returns null if the list does not have a loop', () => {
        // List: 1 -> 2 -> 3 -> 4 -> 5
        const list: Node<number> = { value: 1, next: { value: 2, next: { value: 3, next: { value: 4, next: { value: 5 } } } } };
        const result = loopDetection(list);
        expect(result).toBeNull();
    });

    test('returns the node at the beginning of the loop', () => {
        // List with a loop: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 31 -> 32 -> 31
        const loopNode: Node<number> = { value: 31, next: { value: 32 } };
        loopNode.next!.next = loopNode
        const list: Node<number> = { value: 1, next: { value: 2, next: { value: 3, next: { value: 4, next: { value: 5, next: { value: 6, next: { value: 7, next: { value: 8, next: { value: 9, next: loopNode } } } } } } } } };

        const result = loopDetection(list);
        expect(result).toEqual(loopNode);
    });

    test('returns the node at the beginning of the loop (longer loop)', () => {
        // List with a loop: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 11
        const loopNode: Node<number> = { value: 11, next: {value: 12, next: {value: 13}}};
        loopNode.next!.next!.next = loopNode
        const list: Node<number> = { value: 1, next: { value: 2, next: { value: 3, next: { value: 4, next: { value: 5, next: { value: 6, next: { value: 7, next: { value: 8, next: { value: 9, next: { value: 10, next: loopNode } } } } } } } } } };

        const result = loopDetection(list);
        expect(result).toEqual(loopNode);
    });

});
