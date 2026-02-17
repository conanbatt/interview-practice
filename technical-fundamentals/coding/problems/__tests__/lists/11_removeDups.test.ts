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

  test("remove duplicates with heavy interleaving", () => {
    const n1 = { value: "a" } as Node<string>;
    const n2 = { value: "b" } as Node<string>;
    const n3 = { value: "a" } as Node<string>;
    const n4 = { value: "c" } as Node<string>;
    const n5 = { value: "b" } as Node<string>;
    const n6 = { value: "d" } as Node<string>;
    const n7 = { value: "c" } as Node<string>;
    const n8 = { value: "a" } as Node<string>;

    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    n5.next = n6;
    n6.next = n7;
    n7.next = n8;

    const expected = { value: "a" } as Node<string>;
    expected.next = { value: "b" } as Node<string>;
    expected.next.next = { value: "c" } as Node<string>;
    expected.next.next.next = { value: "d" } as Node<string>;

    const result = removeDups(n1);
    expect(result).toEqual(expected);
  });
});
