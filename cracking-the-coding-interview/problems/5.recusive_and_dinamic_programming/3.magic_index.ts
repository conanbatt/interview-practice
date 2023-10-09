// 3. * Magic Index *: A magic index in an array A[0...n - 1] is defined to be an index such that A[i] = i. Given a sorted array
// of distinct integers, write a method to find a magic index, if one exists, in array A.
// FOLLOW UP: What if the values are not distinct ?

const getMagicIndex = (array, startIndex, endIndex) => {
  if (startIndex === endIndex && array[startIndex]!= startIndex) return false
  const midIndex = Math.floor((startIndex + endIndex) / 2)
  if (array[midIndex] === midIndex) return midIndex
  if (array[midIndex] > midIndex) {
    // seguir por izq
    return getMagicIndex(array, startIndex, midIndex - 1)
  } else if (array[midIndex] < midIndex) {
    // seguir por der
    return getMagicIndex(array, midIndex + 1, endIndex)
  }
}

getMagicIndex([-1,0,2,4,6,7], 0, 5)


// FOLLOW UP: What if the values are not distinct ?
