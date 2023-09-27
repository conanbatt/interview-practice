// 4. * Palindrome Permutation *: Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards.
// A permutation is a rearrangement of letters.The palindrome does not need to be limited to just dictionary words.

// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco eta", etc.)
// ```

const isPalindromePermutation= (value) => {
  if(!value) return false;
  const chars = {}

  for (let i = 0; i < value.length; i++) {
    const charAtI = value.charAt(i);
    if(chars[charAtI]){
      delete chars[charAtI];
    } else {
      chars[charAtI] = 1
    }
  }

  return Object.values(chars).length <= 1
}

