class TreeNodeElement<T> {
  data: T;
  leftChild?: TreeNodeElement<T>;
  rightChild?: TreeNodeElement<T>;

  constructor(data: T) {
    this.data = data;
  }

  hasLeftChild() {
    return !!this.leftChild;
  }

  hasRightChild() {
    return !!this.rightChild;
  }
}

class BinaryTree<T> {
  root?: TreeNodeElement<T>

  length() {
    if(!this.root) return 0;
    return 1
  }
  
}