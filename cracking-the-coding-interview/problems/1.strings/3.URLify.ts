// 3.  URLify: Write a method to replace all spaces in a string with '%20'.You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string.

// ```
// EXAMPLE
// Input: "Mr 3ohn Smith "
// Output: "Mr%203ohn%20Smith"
// ```

const URLify = (value) => {
  return value.replaceAll(' ', '%20');
}