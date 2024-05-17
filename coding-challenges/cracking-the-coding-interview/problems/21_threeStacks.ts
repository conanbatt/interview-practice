// 1. *Three in One*: Describe how you could use a single array to implement three stacks.

export default class ThreeStacks<T> {
    private array: T[];

    constructor(arrayLength: number) {
    }

    push(stackNum: number, value: T): void {
    }

    pop(stackNum: number): T | undefined {
    }

    peek(stackNum: number): T | undefined {
    }
}