// 10. *Implement a Linked List*;

// Create the data structure with the corresponding initial functions:

export type Node<T> = {
  next?: Node<T> | undefined;
  value: T;
};

export class LinkedList<T> {
  head: Node<T> | undefined;
  tail: Node<T> | undefined;

  constructor(head?: Node<T>) {
    this.head = head;
    this.tail = head;
    this.length = 0;
  }

  append(value: T) {
    if (!this.head) {
      this.head = {
        value,
        next: undefined,
      };
    } else {
      // 1 2 3
      // 0
      const newNode = {
        value,
        next: this.head,
      };
      this.head = newNode;
    }
  }

  reverse(): LinkedList<T> {
    let res = new LinkedList<T>();

    this.visit((node) => res.append(node.value));

    return res;
  }

  push(value: T) {
    this.length += 1;

    const newNode: Node<T> = {
      value: value,
      next: undefined,
    };

    // 1 - 2 - 3
    let c = this.head;
    if (!c) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    while (c.next) {
      c = c.next;
    }

    c.next = newNode;
    this.tail = newNode;
  }

  filter(callback: (node: Node<T>, index: number) => boolean) {
    let c = this.head;
    let idx = 0;

    const returnList = new LinkedList<T>();

    while (c) {
      if (callback(c, idx)) {
        returnList.push(c.value);
      }
      c = c.next;
      idx++;
    }

    return returnList;
  }

  visit(callback: (node: Node<T>, index: number) => void) {
    let c = this.head;
    let idx = 0;

    while (c) {
      callback(c, idx);
      c = c.next;
      idx++;
    }
  }

  some(callback: (node: Node<T>, index: number) => boolean) {
    let result = false;
    this.visit((n, i) => {
      result === result || callback(n, i);
    });

    return result;
  }

  remove(node: Node<T>) {
    let c = this.head;
    let prev = null;
    let idx = 0;

    while (c) {
      if (node === c) {
        // remove node
        if (prev) {
          prev.next = c.next;
        } else {
          this.head = c.next;
        }
        this.length -= 1;
      }
      prev = c;
      c = c.next;
      idx++;
    }

    this.length -= 1;
  }

  merge(l: LinkedList<T>) {
    let c = this.head;
    let p = null;
    while (c) {
      p = c;
      c = c.next;
    }

    if (!p) {
      this.head = l.head;
    } else {
      p.next = l.head;
    }
  }

  print() {
    let c = this.head;
    let output = "";
    while (c) {
      output += c.value + " -> ";
      c = c.next;
    }

    console.log(output);
  }

  // extra

  //find(): Node<T> {}
  //get(index: number): Node<T> {}
  //iterator(): LinkedListIterator {}
  length: number;
  len(): number {
    let l = 0;
    this.visit(() => l++);

    return l;
  }
}

const list = new LinkedList();
