// 2. * Stack Min *: How would you design a stack which, in addition to push and pop,
// has a function min which returns the minimum element ? Push, pop, and min should all operate in O(1) time.
function StackMin () {
  const array = [];
  const minStack = {};

  this.array = array
  this.minStack = minStack

  this.push = (value) => {
    array.push(value);
    minStack[value] = value;
  }

  this.pop = () => {
    if (array.length === 0) {
      return undefined; // Stack is empty.
    }

    const popped = array.pop();

    delete minStack[popped]

    return popped;
  }

  this.min = () => {
    if (array.length === 0) {
      return undefined; // Stack is empty.
    }
    const minValues = Object.values(minStack)

    return minValues[0]

  }
}

const stack = new StackMin();

stack.push(5);
stack.push(2);
stack.push(7);

console.log(stack.min()); // 2 (minimum element)

stack.pop();
console.log(stack.min()); // 2 (minimum element after popping)

stack.pop();
console.log(stack.min()); // 5 (minimum element after popping)

stack.push(1);
stack.push(8);
console.log(stack.min()); // 1 (minimum element after pushing 1 and 8)

stack.pop();
stack.pop();
console.log(stack.min()); // 2 (minimum element after popping 8 and 1)

stack.push(0);
stack.push(3);
console.log(stack.min()); // 0 (minimum element after pushing 0 and 3)




// class MinStack {
//   constructor() {
//     this.mainStack = [];     // The main stack to hold the elements.
//     this.minStack = [];      // Auxiliary stack to hold the minimum elements.
//   }

//   push(value) {
//     this.mainStack.push(value);

//     // Update the minStack with the new minimum if applicable.
//     if (
//       this.minStack.length === 0 ||
//       value <= this.minStack[this.minStack.length - 1]
//     ) {
//       this.minStack.push(value);
//     }
//   }

//   pop() {
//     if (this.mainStack.length === 0) {
//       return undefined; // Stack is empty.
//     }

//     const popped = this.mainStack.pop();

//     // If the popped element is the current minimum, also pop it from the minStack.
//     if (popped === this.minStack[this.minStack.length - 1]) {
//       this.minStack.pop();
//     }

//     return popped;
//   }

//   min() {
//     if (this.minStack.length === 0) {
//       return undefined; // Stack is empty.
//     }

//     return this.minStack[this.minStack.length - 1];
//   }
// }

// // Example usage:
// const stack = new MinStack();

// stack.push(5);
// stack.push(2);
// stack.push(7);

// console.log(stack.min()); // 2 (minimum element)
// stack.pop();
// console.log(stack.min()); // 2 (minimum element after popping)
// stack.pop();
// console.log(stack.min()); // 5 (minimum element after popping)
