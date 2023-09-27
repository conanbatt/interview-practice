// 2. *Check Permutation*: Given two strings, write a method to decide if one is a permutation of the other. 

const checkPermutation = (firstString, secondString) => (firstString.toLowerCase().split('').sort().join('')) === secondString.toLowerCase().split('').sort().join('')