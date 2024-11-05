import StackOfPlates from "../23_stackOfPlates";

describe('StackOfPlates', () => {
    test('push and pop elements from stack', () => {
        const stack = new StackOfPlates<number>(3); // Capacity: 3

        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBeUndefined(); // Stack is empty

        stack.push(4);
        stack.push(5);
        stack.push(6);

        expect(stack.pop()).toBe(6);
        expect(stack.pop()).toBe(5);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBeUndefined(); // Stack is empty
    });

    test('push and pop elements from multiple stacks', () => {
        const stack = new StackOfPlates<number>(2); // Capacity: 2

        stack.push(1);
        stack.push(2);

        stack.push(3); // New stack
        stack.push(4);

        stack.push(5); // New stack

        expect(stack.pop()).toBe(5); // Pop from last stack
        expect(stack.pop()).toBe(4); // Pop from middle stack
        expect(stack.pop()).toBe(3); // Pop from middle stack
        expect(stack.pop()).toBe(2); // Pop from first stack
        expect(stack.pop()).toBe(1); // Pop from first stack
        expect(stack.pop()).toBeUndefined(); // Stack is empty
    });

    test('pop from empty stack returns undefined', () => {
        const stack = new StackOfPlates<number>(2); // Capacity: 2

        expect(stack.pop()).toBeUndefined();
    });

    test('push beyond capacity creates new stack', () => {
        const stack = new StackOfPlates<number>(2); // Capacity: 2

        stack.push(1);
        stack.push(2);

        stack.push(3); // New stack
        stack.push(4);

        expect(stack.pop()).toBe(4); // Pop from last stack
        expect(stack.pop()).toBe(3); // Pop from last stack
    });
});
