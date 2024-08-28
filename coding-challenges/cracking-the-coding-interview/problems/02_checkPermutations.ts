// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.
// [LeetCode](https://leetcode.com/problems/permutation-in-string/)

export default function checkPermutations(s1: string, s2: string): boolean {
  const s: { [key: string]: number } = {};

  for (let char of s1) {
    if (s[char] === undefined) {
      s[char] = 1;
    } else {
      s[char] += 1;
    }
  }

  for (let char of s2) {
    if (s[char] === undefined) return false;
    s[char] -= 1;
  }

  return Object.keys(s).reduce((acc, curr) => s[curr] + acc, 0) === 0;
}
