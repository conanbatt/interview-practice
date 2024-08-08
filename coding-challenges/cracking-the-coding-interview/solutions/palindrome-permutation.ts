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
  const m = new Map();
  for (let i = 0; i < str.length; i++) {
    if (!m.get(str[i])) m.set(str[i], 0);

    m.set(str[i], m.get(str[i]) + 1);
  }

  return [...m.values()].filter((v) => v % 2 === 1).length < 2;
}
