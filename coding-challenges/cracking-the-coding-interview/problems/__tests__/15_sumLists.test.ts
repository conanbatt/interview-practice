import { describe, expect, test } from "vitest";
import sumLists, { Node } from "../15_sumLists";

describe("sumLists", () => {
  test("sums two non-empty lists without carryover", () => {
    // 321 + 654 = 975
    const list1: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3 } },
    };
    const list2: Node<number> = {
      value: 4,
      next: { value: 5, next: { value: 6 } },
    };
    const expectedResult: Node<number> = {
      value: 5,
      next: { value: 7, next: { value: 9 } },
    };
    const result = sumLists(list1, list2);
    expect(result).toEqual(expectedResult);
  });

  test("sums two non-empty lists with carryover", () => {
    // 999 + 1 = 1000
    const list1: Node<number> = {
      value: 9,
      next: { value: 9, next: { value: 9 } },
    };
    const list2: Node<number> = { value: 1 };
    const expectedResult: Node<number> = {
      value: 0,
      next: { value: 0, next: { value: 0, next: { value: 1 } } },
    };
    const result = sumLists(list1, list2);
    expect(result).toEqual(expectedResult);
  });

  test("sums two lists with different lengths", () => {
    // 4321 + 65 = 4386
    const list1: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: 4 } } },
    };
    const list2: Node<number> = { value: 5, next: { value: 6 } };
    const expectedResult: Node<number> = {
      value: 6,
      next: { value: 8, next: { value: 3, next: { value: 4 } } },
    };
    const result = sumLists(list1, list2);
    expect(result).toEqual(expectedResult);
  });
});
