// 7. * Permutations without Dups *: Write a method to compute all permutations of a string of unique characters.


const permutations = ["abc", "acb", "bac", "bca", "cab", "cba"]
const stringA = 'abc'


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
  return permute([...str]).map(p => p.join(''))
}

permuteString(stringA)