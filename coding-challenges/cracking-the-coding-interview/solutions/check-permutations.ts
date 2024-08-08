// 2. *Check Permutation*: Given two strings, write a method to decide if one is a permutation of the other.
// [LeetCode](https://leetcode.com/problems/permutation-in-string/)

export function checkPermutations(one: string, another: string) {
  if (one.length !== another.length) return false;

  const oneMap = new Map();
  one.split("").forEach((c) => {
    if (oneMap.has(c)) {
      oneMap.set(c, oneMap.get(c) + 1);
    } else {
      oneMap.set(c, 1);
    }
  });

  //   const anotherMap = new Map();
  //   another.split("").forEach((c) => {
  //     if (anotherMap.has(c)) {
  //       anotherMap.set(c, anotherMap.get(c) + 1);
  //     } else {
  //       anotherMap.set(c, 1);
  //     }
  //   });

  //   return [...oneMap.keys()].every((k) => oneMap.get(k) === anotherMap.get(k));

  // alt from video

  for (let c of another) {
    if (!oneMap.has(c)) return false;

    oneMap.set(c, oneMap.get(c) - 1);
  }

  return [...oneMap.values()].every((v) => v === 0);
}
