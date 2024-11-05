import intersection, { Node } from "../../18_intersection";

describe("intersection", () => {
  test("returns null if the lists do not intersect", () => {
    // List 1: 1 -> 2 -> 3 -> 4
    // List 2: 5 -> 6 -> 7 -> 8
    const list1: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: 4 } } },
    };
    const list2: Node<number> = {
      value: 5,
      next: { value: 6, next: { value: 7, next: { value: 8 } } },
    };
    const result = intersection(list1, list2);
    expect(result).toBeUndefined();
  });

  test("returns intersection node when lists intersect", () => {
    // Common part: 7 -> 8 -> 9
    // List 1: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9
    // List 2: 5 -> 6 -> 7 -> 8 -> 9
    const commonPart: Node<number> = {
      value: 7,
      next: { value: 8, next: { value: 9 } },
    };
    const list1: Node<number> = {
      value: 1,
      next: {
        value: 2,
        next: { value: 3, next: { value: 4, next: commonPart } },
      },
    };
    const list2: Node<number> = {
      value: 5,
      next: { value: 6, next: commonPart },
    };
    const result = intersection(list1, list2);
    expect(result).toEqual(commonPart);
  });

  test("returns intersection node when lists intersect at the head", () => {
    // Common part: 1 -> 2 -> 3
    // List 1: 1 -> 2 -> 3
    // List 2: 1 -> 2 -> 3
    const commonPart: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3 } },
    };
    const result = intersection(commonPart, commonPart);
    expect(result).toEqual(commonPart);
  });

  test("returns intersection node when lists intersect at the end", () => {
    // Common part:  1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
    // List 1: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
    // List 2: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
    const list1: Node<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: { value: 5, next: { value: 6, next: { value: 7 } } },
          },
        },
      },
    };
    const list2: Node<number> = { value: 0, next: list1 };
    const result = intersection(list1, list2);
    expect(result).toEqual(list1);
  });
});
