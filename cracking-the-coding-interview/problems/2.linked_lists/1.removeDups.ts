// 1. * Remove Dups *: Write code to remove duplicates from an unsorted linked list.FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed ?

class Node {
  data
  next
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current?.next) {
        current = current.next;
      }
      if (current) {
        current.next = newNode;
      }
    }
  }

  print() {
    let current = this.head;
    let result = '';
    while (current !== null) {
      result += current.data + ' -> ';
      current = current.next;
    }
    result += null;
    console.log(result);
  }
}

const list = new LinkedList();
list.append(6);
list.append(1);
list.append(6);
list.append(15);
list.print();

const removeDups = (list) => {
  let actual = list.head;
  while (actual !== null) {
    let pointer = actual;
    while (pointer.next !== null) {
      if (pointer.next.data === actual.data) {
        pointer.next = pointer.next.next;
      } else {
        pointer = pointer.next;
      }
    }
    actual = actual.next;
  }
}

removeDups(list);
list.print(); 