// 4. *Palindrome Permutation*: Given a string, write a function to check if it is a permutation of
// a palin- drome. A palindrome is a word or phrase that is the same forwards and backwards.
//A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco eta", etc.)
// ```

export default function isPalindromePermutation(s: string) {
  const str = s.toLowerCase().replace(" ", "");
  for (let i = 0; i < str.length; i++) {
    if (
      str.charAt(i).toLowerCase() !==
      str.charAt(str.length - (i + 1)).toLowerCase()
    )
      return false;
  }
  return true;
}
