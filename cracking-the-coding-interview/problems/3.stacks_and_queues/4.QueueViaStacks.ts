// 4. * Queue via Stacks *: Implement a MyQueue class which implements a queue using two stacks.

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

class MyQueue {
  memoStack;
  definitiveStack;

  constructor() {
    this.memoStack = new Stack()
    this.definitiveStack = new Stack()
  }

  add(element) {
    while (this.definitiveStack.size() > 0) {
      const elementPopped = this.definitiveStack.pop()
      this.memoStack.push(elementPopped)
    }
    this.memoStack.push(element)
    while (this.memoStack.size() > 0) {
      const elementPopped = this.memoStack.pop()
      this.definitiveStack.push(elementPopped)
    }
  }

  remove() {
    return this.definitiveStack.pop()
  }

  peek(){
    return this.definitiveStack.peek()
  }

  size() {
    return this.definitiveStack.size()
  }

  isEmpty() {
    return this.definitiveStack.isEmpty()
  }
}

