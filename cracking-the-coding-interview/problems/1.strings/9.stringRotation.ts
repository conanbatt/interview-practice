// 9. *String Rotation*; Assume you have a method i s S u b s t r i n g which checks if one word is a substring of another.
// Given two strings, si and s2, write code to check if s2 is a rotation of si using only one call to isSubst ring
// [e.g., "waterbottle" is a rotation oP'erbottlewat")

const isRotation = (wordA, wordB) => wordA.length === wordB.length && wordA.length > 0 ? (wordA + wordA).includes(wordB) : false;

const s1 = "waterbottle";
const s2 = "erbottlewat";
const result = isRotation(s1, s2);
console.log(result); // Output: true