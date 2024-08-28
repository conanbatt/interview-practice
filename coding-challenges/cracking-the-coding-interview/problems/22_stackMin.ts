// 2. *Stack Min*: How would you design a stack which,
// in addition to push and pop,
// has a function min which returns the minimum element?
// Push, pop, and min should all operate in O(1) time.
//

export default class StackMin<T> {
  private array: T[];
  private minArray: T[];
  constructor() {
    this.array = new Array();
    this.minArray = new Array();
  }

  push(value: T): void {
    this.array.push(value);

    const m = this.min();
    if (!m || value < m) {
      this.minArray.push(value);
    }
  }

  pop(): T | undefined {
    const value = this.array.pop();
    if (value === this.min()) {
      this.minArray.pop();
    }
    return value;
  }

  min(): T | undefined {
    return this.minArray[this.minArray.length - 1];
  }
}
