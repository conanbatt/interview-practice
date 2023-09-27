// 6. * String Compression *: 
// Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3,If the "compressed" string would not become smaller than
// the original string, your method should return the original string.
// You can assume the string has only uppercase and lowercase letters(a - z).

const stringCompression = (value) => {
  let stringCompression = '';
  let compressionCount = 0;
  for (let i = 0; i <= value.length; i++) {
    const charAtI = value.charAt(i);
    const lastStringOnCompression = stringCompression.charAt(stringCompression.length - 1);
    if (lastStringOnCompression === charAtI) {
      compressionCount++;
    } else if (compressionCount === 0 && charAtI) {
      stringCompression += charAtI;
      compressionCount++;
    } else if (charAtI) {
      stringCompression += compressionCount + charAtI;
      compressionCount = 1;
    } else {
      stringCompression += compressionCount;
    }
  }
  return stringCompression.length < value.length ? stringCompression : value;
}

console.log(stringCompression("aabcccccaaa")); // Output: "a2b1c5a3"
console.log(stringCompression("abcd"));        // Output: "abcd" (Not compressed, as compressed string is longer)
console.log(stringCompression("aaAAaa"));      // Output: "aaAAaa" (Case-sensitive)
console.log(stringCompression("aaAAaaa"));      // Output: "a2A2a3" (Case-sensitive)
console.log(stringCompression(""));            // Output: "" (Empty string)
console.log(stringCompression("x"));           // Output: "x" (Single character)
