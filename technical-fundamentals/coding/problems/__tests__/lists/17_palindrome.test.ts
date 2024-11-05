import isPalindrome, { Node } from "../../17_palindrome";

describe("isPalindrome", () => {
  test("single node list is palindrome", () => {
    const node: Node<number> = { value: 1 };
    const result = isPalindrome(node);
    expect(result).toBe(true);
  });

  test("palindrome list with odd number of nodes", () => {
    // 1 -> 2 -> 3 -> 2 -> 1
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };
    const node4: Node<number> = { value: 2 };
    const node5: Node<number> = { value: 1 };
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;

    const result = isPalindrome(node1);
    expect(result).toBe(true);
  });

  test("non-palindrome list", () => {
    // 1 -> 2 -> 3 -> 4 -> 5
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };
    const node4: Node<number> = { value: 4 };
    const node5: Node<number> = { value: 5 };
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;

    const result = isPalindrome(node1);
    expect(result).toBe(false);
  });

  test("palindrome list with even number of nodes", () => {
    // 1 -> 2 -> 2 -> 1
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 2 };
    const node4: Node<number> = { value: 1 };
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;

    const result = isPalindrome(node1);
    expect(result).toBe(true);
  });
});
