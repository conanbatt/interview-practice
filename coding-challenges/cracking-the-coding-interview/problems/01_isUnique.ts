// 1. *Is Unique*:

// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

export default function isUnique(str: string): boolean {
  // const s = new Set();

  // for (let i = 0; i < str.length; i++) {
  //   const c = str[i];
  //   if (s.has(c)) return false;

  //   s.add(c);
  // }

  // return true;

  for (let i = 0; i < str.length; i++) {
    for (let j = str.length - 1; j > i; j--) {
      const c = str[i];
      const b = str[j];

      if (c === b) return false;
    }
  }

  return true;
}
