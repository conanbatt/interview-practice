// 5. *One Away*:

// There are three types of edits that can be performed on strings:
// insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

export default function isOneAway(str1: string, str2: string): boolean {
  if (Math.abs(str1.length - str2.length) > 2) return false;

  let misses = 0;
  let c1 = 0;
  let c2 = 0;

  while (c1 < str1.length && c2 < str2.length) {
    if (str1[c1] !== str2[c2]) {
      misses++;

      if (str1.length < str2.length) {
        c2++;
      } else if (str1.length > str2.length) {
        c1++;
      }
    }

    c1++;
    c2++;
  }

  return misses < 2;
}
