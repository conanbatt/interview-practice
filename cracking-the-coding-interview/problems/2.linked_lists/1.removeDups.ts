// 1. * Remove Dups *: Write code to remove duplicates from an unsorted linked list.FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed ?

const removeDups = (list) => {
  const setItems = new Set(list);
  return [...setItems.values()]
}

console.log(removeDups([1,2,3,1])) // [1,2,3]