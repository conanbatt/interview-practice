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
  constructor() {}

  append(data: T) {
    const newNode = new NodeElement(data)
    if(!this.head){
      this.head = newNode
    } else {
      let current: NodeElement<T> | undefined = this.head;
      while(current?.hasNext()){
        current = current.next
      }
      if(current) {
        current.next = newNode
      }
    }
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
    if(!this.head) return
    if(this.head.data === data) {
      const found = this.head
      this.head = this.head.next
      return found
    }
    const current: NodeElement<T> | undefined = this.head
    while (current.next) {
      const next = current.next
      if (next.data === data) {
        current.next = current.next.next
        return next
      }
    }
    return
  }

  length() {
    let count = 0;
    let current: NodeElement<T> | undefined = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
}