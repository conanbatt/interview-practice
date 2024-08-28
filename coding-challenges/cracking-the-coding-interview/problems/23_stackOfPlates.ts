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
  private array: (T[] | undefined)[] = [];
  private capacity: number;
  constructor(capacity: number) {
    this.capacity = capacity;
  }

  push(value: T): void {
    if (this.array.length === 0) {
      this.array[0] = new Array();
      this.array[0].push(value);
      return;
    }

    const currentStack = this.array[this.array.length - 1];
    if (currentStack && currentStack.length < this.capacity) {
      currentStack.push(value);
    } else {
      this.array[this.array.length] = new Array();
      this.array[this.array.length - 1]!.push(value);
    }
  }

  pop(): T | undefined {
    const lastArray = this.array[this.array.length - 1];
    if (!lastArray) return;

    const p = lastArray.pop();

    if (lastArray.length === 0) {
      this.array.pop();
    }

    return p;
  }

  print() {
    for (let a of this.array) {
      console.log(a);
    }
  }
}
