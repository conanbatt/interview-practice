// 3. *Stack of Plates*:

// Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
// Therefore, in real life, we would likely start a new stack when the previous stack
// exceeds some threshold. Implement a data structure SetOfStacks that mimics this.
// SetOfStacks should be composed of several stacks and should create a new stack once
// the previous one exceeds capacity. SetOfStacks.push() and SetOfStacks.pop() should behave
// identically to a single stack (that is, pop() should return the same values as it would if
// there were just a single stack).

// FOLLOW UP: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.

export default class StackOfPlates<T> {
    private capacity: number;
    private substacks: T[][];

    constructor(capacity: number) {
        this.capacity = capacity;
        this.substacks = [];
    }

    push(value: T): void {
        const res = this.substacks.find((stack) => stack.length < this.capacity);
        if(res){
            res.push(value);
        } else {
            this.substacks.push([value]);
        }
    }

    pop(): T | undefined {
        const currentSubstack = this.getCurrentSubstack();
        const result = currentSubstack.pop();
        if(currentSubstack.length === 0){
            this.substacks.pop();
        }
        return result;
    }

    popAt(index: number): T | undefined {
        const resStack: T[] | undefined = this.substacks[index];
        const res = resStack.pop();
        if(resStack.length === 0){
            this.substacks = this.substacks.filter((n) => n.length > 0);
        }
        return res;
    }

    //this had mod sense with my first approach, but now it's working so I keep it
    private getCurrentSubstack(): T[]{
        if(this.substacks.length === 0){
            this.substacks.push([]);
            return this.substacks[0];
        } else {
            return this.substacks[this.substacks.length - 1];
        }
    }

    //my first approach: I did it manually without find...
    push2(value: T): void {
        const currStack: T[] = this.getCurrentSubstack();
        if(currStack.length === this.capacity){
            const newStack: T[] = [];
            newStack.push(value);
            this.substacks.push(newStack);
        } else {
            currStack.push(value);
        }
    }
}

