// FOLLOW UP: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.

class SetOfStacks {
  capacity;
  stacks;
  currentIndex;
  constructor(capacity) {
    this.capacity = capacity;
    this.stacks = [[]];
    this.currentIndex = 0; // Track the current stack index
  }

  push(value) {
    if (this.stacks[this.currentIndex].length >= this.capacity) {
      this.stacks.push([]);
      this.currentIndex++;
    }
    this.stacks[this.currentIndex].push(value);
  }

  pop() {
    if (this.currentIndex < 0) {
      return undefined; // All stacks are empty.
    }

    const poppedValue = this.stacks[this.currentIndex].pop();

    if (this.stacks[this.currentIndex].length === 0) {
      this.stacks.pop();
      this.currentIndex--;
    }

    return poppedValue;
  }

  popAt(index) {
    if (index < 0 || index >= this.stacks.length || this.stacks[index].length === 0) {
      return undefined; // Invalid index or empty stack.
    }
    return this.stacks[index].pop();
  }
}


const setOfStacks = new SetOfStacks(3);

setOfStacks.push(1);
setOfStacks.push(2);
setOfStacks.push(3);
setOfStacks.push(4);
setOfStacks.push(5);
setOfStacks.push(6);

console.log(setOfStacks.pop()); // Outputs: 6
console.log(setOfStacks.popAt(0)); // Outputs: 3 (pop from the first stack)
