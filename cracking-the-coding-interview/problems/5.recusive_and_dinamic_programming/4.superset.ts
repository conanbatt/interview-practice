/// 4. *Power Set*: Write a method to return all subsets of a set.

// [1] [3] [1, 3] [2] [2, 1] ,[2,1,3] [4] [3,4], [1,3,4] [2,4] [1,2,4][1,2,3,4]


const getSuperset = (array, index= 0, result = [[]]) => {
  if(index === array.length) {
    return result
  }
  result.forEach(item => result.push([...(item.length >= 0 ? item : [item]), array[index]]))
  return getSuperset(array, index + 1, result)
}

const arr = [1, 2, 3, 4, 5]

getSuperset(arr, 0)