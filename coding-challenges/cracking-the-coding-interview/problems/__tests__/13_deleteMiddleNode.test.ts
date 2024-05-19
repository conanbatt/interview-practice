import deleteMiddleNode, { Node } from "../13_deleteMiddleNode";

describe('deleteMiddleNode', () => {
    test('deletes middle node at position 3', () => {
        // Create a linked list for testing
        const head: Node<number> = { value: 1 };
        let current: Node<number> | undefined = head;
        for (let i = 2; i <= 5; i++) {
            current.next = { value: i };
            current = current.next;
        }

        // Delete middle node at position 3
        const result = deleteMiddleNode(head, 3);

        // Ensure that the middle node is deleted
        let expectedValue = 1;
        let curr: Node<number> | undefined | null = result;
        while (curr) {
            expect(curr.value).toBe(expectedValue);
            expectedValue++;
            if (expectedValue === 3) {
                expectedValue++; // Skip deleted middle node
            }
            curr = curr.next;
        }
    });

    test('deletes first middle node at position 2', () => {
        // Create a linked list for testing
        const head: Node<number> = { value: 1 };
        let current: Node<number> | undefined = head;
        for (let i = 2; i <= 4; i++) {
            current.next = { value: i };
            current = current.next;
        }

        // Delete middle node at position 2
        const result = deleteMiddleNode(head, 2);

        // Ensure that the middle node is deleted
        let expectedValue = 1;
        let curr: Node<number> | undefined | null = result;
        while (curr) {
            expect(curr.value).toBe(expectedValue);
            expectedValue++;
            if (expectedValue === 2) {
                expectedValue++; // Skip deleted middle node
            }
            curr = curr.next;
        }
    });

    test('deletes last middle node at position 3', () => {
        // Create a linked list for testing
        const head: Node<number> = { value: 1 };
        let current: Node<number> | undefined = head;
        for (let i = 2; i <= 4; i++) {
            current.next = { value: i };
            current = current.next;
        }

        // Delete middle node at position 3
        const result = deleteMiddleNode(head, 3);

        // Ensure that the middle node is deleted
        let expectedValue = 1;
        let curr: Node<number> | undefined | null = result;
        while (curr) {
            expect(curr.value).toBe(expectedValue);
            expectedValue++;
            if (expectedValue === 3) {
                expectedValue++; // Skip deleted middle node
            }
            curr = curr.next;
        }
    });

    test('no deletion if position is 1', () => {
        // Create a linked list for testing
        const head: Node<number> = { value: 1 };
        head.next = { value: 2 };

        // Delete middle node at position 1
        const result = deleteMiddleNode(head, 1);

        // Ensure that no deletion occurred
        expect(result?.value).toBe(1);
        expect(result?.next?.value).toBe(2);
        expect(result?.next?.next).toBeUndefined();
    });

    test('no deletion if position is out of range', () => {
        // Create a linked list for testing
        const head: Node<number> = { value: 1 };
        head.next = { value: 2 };
        head.next.next = { value: 3 };

        // Delete middle node at position out of range
        const result = deleteMiddleNode(head, 4);

        // Ensure that no deletion occurred
        let expectedValue = 1;
        let curr: Node<number> | undefined | null = result;
        while (curr) {
            expect(curr.value).toBe(expectedValue);
            expectedValue++;
            curr = curr.next;
        }
    });

    test('no deletion if position is less than 1', () => {
        // Create a linked list for testing
        const head: Node<number> = { value: 1 };
        head.next = { value: 2 };
        head.next.next = { value: 3 };

        // Delete middle node at position less than 1
        const result = deleteMiddleNode(head, 0);

        // Ensure that no deletion occurred
        let expectedValue = 1;
        let curr: Node<number> | undefined | null = result;
        while (curr) {
            expect(curr.value).toBe(expectedValue);
            expectedValue++;
            curr = curr.next;
        }
    });

    test('no deletion if list has only one node', () => {
        // Create a linked list with only one node
        const head: Node<number> = { value: 1 };

        // Delete middle node
        const result = deleteMiddleNode(head, 2);

        // Ensure that no deletion occurred
        expect(result?.value).toBe(1);
        expect(result?.next).toBeUndefined();
    });

    test('no deletion if list has only two nodes', () => {
        // Create a linked list with two nodes
        const head: Node<number> = { value: 1 };
        head.next = { value: 2 };

        // Delete middle node
        const result = deleteMiddleNode(head, 2);

        // Ensure that no deletion occurred
        expect(result?.value).toBe(1);
        expect(result?.next?.value).toBe(2);
        expect(result?.next?.next).toBeUndefined();
    });
});
