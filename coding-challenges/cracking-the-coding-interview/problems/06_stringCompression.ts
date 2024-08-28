// 6. *String Compression*:

// Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3,
// If the "compressed" string would not become smaller than the original string,
// your method should return the original string.
// You can assume the string has only uppercase and lowercase letters (a - z).

// aabcccccaaa
export default function stringCompression(str: string): string {
  let output = "";
  let c = 1;
  let count = 1;
  while (c < str.length) {
    const prev = str[c - 1];
    const char = str[c];

    if (prev === char) {
      count++;
    } else {
      output += prev + count;
      count = 1;
    }

    c++;
  }

  output += str[str.length - 1] + count;

  return output.length > str.length ? str : output;
}
