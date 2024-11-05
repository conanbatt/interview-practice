import kthToLast, { Node } from "../../12_kthToLast";

describe("12 - kthToLast", () => {
  test("returns undefined if k is less than 1", () => {
    const node1: Node<number> = { value: 1 };
    const result = kthToLast(node1, 0);
    expect(result).toBeUndefined();
  });

  test("returns undefined if k is greater than the length of the list", () => {
    const node1: Node<number> = { value: 1 };
    const result = kthToLast(node1, 2);
    expect(result).toBeUndefined();
  });

  test("returns the kth to last element when k is valid", () => {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };
    const node4: Node<number> = { value: 4 };
    const node5: Node<number> = { value: 5 };
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;

    const result = kthToLast(node1, 2);
    // The 2nd to last element in this list is 4
    expect(result).toEqual(node4);
  });

  test("returns the head if k is equal to the length of the list", () => {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };
    const node4: Node<number> = { value: 4 };
    const node5: Node<number> = { value: 5 };
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;

    const result = kthToLast(node1, 5);
    expect(result).toEqual(node1);
  });
});
