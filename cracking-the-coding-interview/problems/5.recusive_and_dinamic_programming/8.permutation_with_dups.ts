// 8. * Permutations with Dups *: Write a method to compute all permutations of a string whose characters are not necessarily unique.
// The list of permutations should not have duplicates.

const permutations = ["abc", "acb", "bac", "bca", "cab", "cba"]
const stringA = 'abcccc'


const permute = (array) => {
  if (array.length <= 1) return array
  let permutations = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const newArray = [...array]
    newArray.splice(index, 1);
    const permutationI = permute(newArray)
    const resultPermutationI = permutationI.map(item => [element, ...item])
    permutations = [...permutations, ...resultPermutationI]
  }
  return permutations;
}

const permuteString = (str) => {
  const set = new Set([...str])
  return permute(Array.from(set)).map(p => p.join(''))
}

permuteString(stringA)