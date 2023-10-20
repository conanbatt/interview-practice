class NodeElement<T> {
  data: T;
  next?: NodeElement<T>;

  constructor(data: T) {
    this.data = data;
  }

  hasNext() {
    return !!this.next;
  }
}

class LinkedList<T> {
  head?: NodeElement<T>;
  private count: number = 0;

  constructor() { }

  append(data: T) {
    const newNode = new NodeElement(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current: NodeElement<T> | undefined = this.head;
      while (current?.hasNext()) {
        current = current.next;
      }
      if (current) {
        current.next = newNode;
      }
    }
    this.count++;
  }

  search(data: T): NodeElement<T> | undefined {
    let current: NodeElement<T> | undefined = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return undefined;
  }

  delete(data: T): NodeElement<T> | undefined {
    if (!this.head) return;
    if (this.head.data === data) {
      const found = this.head;
      this.head = this.head.next;
      this.count--; 
      return found;
    }
    let current = this.head;
    while (current.next) {
      const next = current.next;
      if (next.data === data) {
        current.next = next.next;
        this.count--; 
        return next;
      }
      current = next;
    }
    return;
  }

  length() {
    return this.count; 
  }
}
