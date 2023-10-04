// 2. * Minimal Tree *: Given a sorted(increasing order) array with unique integer elements,
// write an algorithm to create a binary search tree with minimal height.

class MinimalTreeNode {
  value;
  left;
  right;

  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}


const addToBST = (array)=>{
  if(array?.length === 0) return
  // base case
  if (array.length === 1) {
    return new MinimalTreeNode(array[0])
  }
  if (array.length > 1) {
    const midNumber = Math.floor(array.length / 2)
    const value = array[midNumber]
    const leftCeil = midNumber
    const leftArray = array.slice(0, leftCeil)
    const rightFloor = midNumber + 1
    const rightArray = array.slice(rightFloor, array.length)

    return new MinimalTreeNode(value, addToBST(leftArray), addToBST(rightArray) )
  }
}

const uniqueOrderArray = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

//                 9
//            5         13
//         2    7    11    15
//        1 3  6 8  10 12 14  


const bst = addToBST(uniqueOrderArray)


const uniqueOrderArrayOne = [1]

//                1


const bstOne = addToBST(uniqueOrderArrayOne)


const uniqueOrderArrayThree = [1,2,3]

//                3
//            2        5


const bstThree = addToBST(uniqueOrderArrayThree)

const uniqueOrderArrayFive = [1, 2, 3, 4, 5]

//                3
//            2        5
//         1         4    


const bstFive = addToBST(uniqueOrderArrayFive)


const uniqueOrderArraySix = [1, 2, 3, 4, 5, 6]

//                4
//            2        6
//         1    3    5    


const bstSix = addToBST(uniqueOrderArraySix)

const uniqueOrderArraySeven = [1, 2, 3, 4, 5, 6, 7]

//                4
//            2        6
//         1    3    5   7


const bstSeven = addToBST(uniqueOrderArraySeven)