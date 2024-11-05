import deleteMiddleNode, { Node } from "../../13_deleteMiddleNode";

describe("deleteMiddleNode", () => {
  test("deletes middle node at position 1", () => {
    const node = {
      value: 0,
      next: { value: 1, next: { value: 2, next: { value: 3 } } },
    };

    const result = deleteMiddleNode(node, 1);

    expect(result).toEqual({
      value: 0,
      next: { value: 2, next: { value: 3 } },
    });
  });

  test("no deletion if position is out of range", () => {
    const head: Node<number> = { value: 1 };
    head.next = { value: 2 };
    head.next.next = { value: 3 };

    const result = deleteMiddleNode(head, 4);

    let expectedValue = 1;
    let curr: Node<number> | undefined | null = result;
    while (curr) {
      expect(curr.value).toBe(expectedValue);
      expectedValue++;
      curr = curr.next;
    }
  });

  test("no deletion if position is less than 1", () => {
    const head: Node<number> = { value: 1 };
    head.next = { value: 2 };
    head.next.next = { value: 3 };

    const result = deleteMiddleNode(head, 0);

    let expectedValue = 1;
    let curr: Node<number> | undefined | null = result;
    while (curr) {
      expect(curr.value).toBe(expectedValue);
      expectedValue++;
      curr = curr.next;
    }
  });

  test("no deletion if list has only one node", () => {
    const head: Node<number> = { value: 1 };

    const result = deleteMiddleNode(head, 2);

    expect(result?.value).toBe(1);
    expect(result?.next).toBeUndefined();
  });

  test("no deletion if list has only two nodes", () => {
    const head: Node<number> = { value: 1 };
    head.next = { value: 2 };

    const result = deleteMiddleNode(head, 2);

    // Ensure that no deletion occurred
    expect(result?.value).toBe(1);
    expect(result?.next?.value).toBe(2);
    expect(result?.next?.next).toBeUndefined();
  });
});
