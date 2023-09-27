// 5. *One Away*: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

const isOneAway = (firstString, secondString) => {
  if (firstString === undefined || secondString === undefined) return false;
  if (Math.abs(firstString.length - secondString.length) > 1) return false;
  const largeString = firstString.length > secondString.length ? firstString : secondString;
  const shortString = largeString === secondString ? firstString : secondString;
  let editCount = 0;
  let shortIndex = 0;
  let largeIndex = 0;

  while (shortIndex <= shortString.length || largeIndex <= largeString.length) {
    if (editCount > 1) return false;
    if (shortString.charAt(shortIndex) === largeString.charAt(largeIndex)) {
      shortIndex++;
      largeIndex++;
    } else if (shortString.charAt(shortIndex + 1) === largeString.charAt(largeIndex + 1)) {
      editCount++;
      shortIndex++;
      largeIndex++;
    } else {
      editCount++;
      largeIndex++;
    }
  }

  return editCount <= 1 && shortIndex >= shortString.length && largeIndex >= largeString.length;
}

console.log(isOneAway('ba', 'ab'));    // false (two character removes)
console.log(isOneAway('pale', 'ple'));    // true (remove 'a')
console.log(isOneAway('pales', 'pale'));  // true (remove 's')
console.log(isOneAway('pale', 'bale'));   // true (replace 'p' with 'b')
console.log(isOneAway('pale', 'bake'));    // false (two character replacements)
console.log(isOneAway('hello', 'helaao')); // false (two character insertions)
console.log(isOneAway('abc', 'abc'));  // true (zero edits)
console.log(isOneAway('', ''));        // true (zero edits with empty strings)

