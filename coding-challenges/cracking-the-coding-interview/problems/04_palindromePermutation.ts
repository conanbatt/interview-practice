// 4. *Palindrome Permutation*:

// Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters.
// The palindrome does not need to be limited to just dictionary words.
// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco cta", etc.)
// ```

export default function palindromePermutation(str: string): boolean {
  const s: { [key: string]: number } = {};
  const parsed = str.replaceAll(" ", "").toLowerCase();

  for (let i = 0; i < parsed.length; i++) {
    const char = parsed[i];
    if (s[char] === undefined) {
      s[char] = 1;
    } else {
      s[char] += 1;
    }
  }

  return Object.keys(s).filter((key) => s[key] % 2 !== 0).length < 2;
}
