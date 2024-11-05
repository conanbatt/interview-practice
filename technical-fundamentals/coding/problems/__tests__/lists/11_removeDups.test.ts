import removeDups, { Node } from "../../11_removeDups";

describe("11 - removeDups", () => {
  test("remove duplicates on linked list", () => {
    const node1 = { value: "a" } as Node<string>;
    const node2 = { value: "a" } as Node<string>;
    const node3 = { value: "b" } as Node<string>;
    node1.next = node2;
    node2.next = node3;

    const expected = { value: "a" } as Node<string>;
    expected.next = { value: "b" } as Node<string>;

    const result = removeDups(node1);
    expect(result).toEqual(expected);
  });

  test("no duplicates in linked list", () => {
    const node1 = { value: "a" } as Node<string>;
    const node2 = { value: "b" } as Node<string>;
    const node3 = { value: "c" } as Node<string>;
    node1.next = node2;
    node2.next = node3;

    const expected = { value: "a" } as Node<string>;
    expected.next = { value: "b" } as Node<string>;
    expected.next.next = { value: "c" } as Node<string>;

    const result = removeDups(node1);
    expect(result).toEqual(expected);
  });

  test("multiple duplicates in linked list", () => {
    const node1 = { value: "a" } as Node<string>;
    const node2 = { value: "a" } as Node<string>;
    const node3 = { value: "a" } as Node<string>;
    node1.next = node2;
    node2.next = node3;

    const expected = { value: "a" } as Node<string>;

    const result = removeDups(node1);
    expect(result).toEqual(expected);
  });

  test("empty linked list", () => {
    const result = removeDups();
    expect(result).toBeUndefined();
  });

  test("linked list with one node", () => {
    const node1 = { value: "a" } as Node<string>;

    const result = removeDups(node1);
    expect(result).toEqual(node1);
  });
});
