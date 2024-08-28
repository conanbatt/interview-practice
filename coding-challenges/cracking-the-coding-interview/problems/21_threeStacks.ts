// 1. *Three in One*: Describe how you could use a single array to implement three stacks.

export default class ThreeStacks<T> {
  private array: (T | undefined)[];
  private length: number;

  constructor(arrayLength: number) {
    this.length = arrayLength;
    this.array = new Array(arrayLength);
  }

  toArrayPosition(stackNum: number): number {
    return stackNum * (this.length / 3);
  }

  push(stackNum: number, value: T): void {
    let p = 0;
    while (
      p < this.length / 3 &&
      this.array[this.toArrayPosition(stackNum) + p]
    ) {
      p++;
    }

    this.array[this.toArrayPosition(stackNum) + p] = value;
  }

  pop(stackNum: number): T | undefined {
    let p = 0;
    while (
      p < this.length / 3 &&
      this.array[this.toArrayPosition(stackNum) + p]
    ) {
      p++;
    }
    const value = this.array[this.toArrayPosition(stackNum) + p - 1];
    this.array[this.toArrayPosition(stackNum) + p - 1] = undefined;
    return value;
  }

  peek(stackNum: number): T | undefined {
    let p = 0;
    while (
      p < this.length / 3 &&
      this.array[this.toArrayPosition(stackNum) + p]
    ) {
      p++;
    }
    return this.array[this.toArrayPosition(stackNum) + p - 1];
  }

  print() {
    console.log(this.array);
  }
}
