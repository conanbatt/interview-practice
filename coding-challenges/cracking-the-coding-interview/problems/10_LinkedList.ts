// 10. *Implement a Linked List*;

// Create the data structure with the corresponding initial functions:
// push()
// head / tail accessors

export type Node<T> = {
  next?: Node<T> | undefined;
  value: T;
};

export class LinkedList<T> {
}
