import SortStack from "../../25_sortStack";

describe('SortStack', () => {
    test('push elements in sorted order', () => {
        const stack = new SortStack<number>();

        stack.push(3);
        expect(stack.peek()).toBe(3);

        stack.push(1);
        expect(stack.peek()).toBe(1);

        stack.push(5);
        expect(stack.peek()).toBe(1);

        stack.push(2);
        expect(stack.peek()).toBe(1);

        stack.push(4);
        expect(stack.peek()).toBe(1);
    });

    test('pop elements in sorted order', () => {
        const stack = new SortStack<number>();

        stack.push(3);
        stack.push(1);
        stack.push(5);
        stack.push(2);
        stack.push(4);

        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(5);
        expect(stack.pop()).toBeUndefined(); // Stack is empty
    });

    test('peek returns the top element without removing it', () => {
        const stack = new SortStack<number>();

        stack.push(3);
        stack.push(1);
        stack.push(5);

        expect(stack.peek()).toBe(1);
        expect(stack.peek()).toBe(1); // Peek again, the top element remains unchanged
    });

    test('isEmpty returns true for empty stack', () => {
        const stack = new SortStack<number>();

        expect(stack.isEmpty()).toBe(true);
    });

    test('isEmpty returns false for non-empty stack', () => {
        const stack = new SortStack<number>();

        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
    });
});
