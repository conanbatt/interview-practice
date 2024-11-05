import ThreeStacks from "../../21_threeStacks";

describe("ThreeStacks", () => {
  test("push and pop elements from stack 1", () => {
    const threeStacks = new ThreeStacks<number>(9); // Array length: 9

    threeStacks.push(0, 1);
    threeStacks.push(0, 2);
    threeStacks.push(0, 3);
    expect(threeStacks.pop(0)).toBe(3);
    expect(threeStacks.pop(0)).toBe(2);
    expect(threeStacks.pop(0)).toBe(1);
    expect(threeStacks.pop(0)).toBeUndefined(); // Stack should be empty now
  });

  test("push and pop elements from stack 2", () => {
    const threeStacks = new ThreeStacks<number>(9); // Array length: 9

    threeStacks.push(1, 4);
    threeStacks.push(1, 5);
    threeStacks.push(1, 6);
    expect(threeStacks.pop(1)).toBe(6);
    expect(threeStacks.pop(1)).toBe(5);
    expect(threeStacks.pop(1)).toBe(4);
    expect(threeStacks.pop(1)).toBeUndefined(); // Stack should be empty now
  });

  test("push and pop elements from stack 3", () => {
    const threeStacks = new ThreeStacks<number>(9); // Array length: 9

    threeStacks.push(2, 7);
    threeStacks.push(2, 8);
    threeStacks.push(2, 9);
    expect(threeStacks.pop(2)).toBe(9);
    expect(threeStacks.pop(2)).toBe(8);
    expect(threeStacks.pop(2)).toBe(7);
    expect(threeStacks.pop(2)).toBeUndefined(); // Stack should be empty now
  });

  test("pop elements from empty stack", () => {
    const threeStacks = new ThreeStacks<number>(3); // Array length: 3

    // Attempt to pop from empty stacks should return undefined
    expect(threeStacks.pop(0)).toBeUndefined();
    expect(threeStacks.pop(1)).toBeUndefined();
    expect(threeStacks.pop(2)).toBeUndefined();
  });

  test("peek elements from stacks", () => {
    const threeStacks = new ThreeStacks<number>(3); // Array length: 9

    threeStacks.push(0, 1);
    threeStacks.push(1, 2);
    threeStacks.push(2, 3);

    expect(threeStacks.peek(0)).toBe(1);
    expect(threeStacks.peek(1)).toBe(2);
    expect(threeStacks.peek(2)).toBe(3);
  });

  test("peek elements from empty stack", () => {
    const threeStacks = new ThreeStacks<number>(3); // Array length: 3

    // Attempt to peek from empty stacks should return undefined
    expect(threeStacks.peek(0)).toBeUndefined();
    expect(threeStacks.peek(1)).toBeUndefined();
    expect(threeStacks.peek(2)).toBeUndefined();
  });
});
