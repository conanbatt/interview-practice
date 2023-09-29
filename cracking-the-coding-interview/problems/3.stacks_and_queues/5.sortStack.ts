// 5. * Sort Stack *: Write a program to sort a stack such that the smallest items are on the top.
// You can use an additional temporary stack, but you may not copy the elements into any other data
// structure(such as an array).The stack supports the following operations: push, pop, peek, and isEmpty.

class Stack {
  items;
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

class SortedStack {
  mainStack;
  tempStack;

  constructor() {
    this.mainStack = new Stack();
    this.tempStack = new Stack();
  }

  push(element) {
    while (!this.mainStack.isEmpty() && element > this.mainStack.peek()) {
      this.tempStack.push(this.mainStack.pop());
    }
    this.mainStack.push(element);
    while (!this.tempStack.isEmpty()) {
      this.mainStack.push(this.tempStack.pop());
    }
  }

  pop() {
    return this.mainStack.pop();
  }

  peek() {
    return this.mainStack.peek();
  }

  size() {
    return this.mainStack.size();
  }

  isEmpty() {
    return this.mainStack.isEmpty();
  }
}

const q = new SortedStack();
q.push(1);
q.push(2);
q.push(55);
q.push(22);
q.push(21);
q.push(5);

console.log(q.mainStack);
