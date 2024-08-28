// 9. *String Rotation*;

// Assume you have a method isSubstring which checks if one word is a substring of another.
// Given two strings, si and s2, write code to check if s2 is a rotation of 1i using only one call to isSubstring
// [e.g., "waterbottle" is a rotation oP'erbottlewat")

function isSubstring(s1: string, s2: string): boolean {
  return s1.includes(s2);
}

export default function stringRotation(s1: string, s2: string): boolean {
  let c = 0;

  while (s1[0] !== s2[c]) {
    c++;
  }

  let compare = s2.substring(c) + s2.slice(0, c);
  return isSubstring(s1, compare);
}
