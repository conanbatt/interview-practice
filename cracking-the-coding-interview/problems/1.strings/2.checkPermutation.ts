// 2. *Check Permutation*: Given two strings, write a method to decide if one is a permutation of the other. 

const checkPermutation = (firstString, secondString) => (firstString.toLowerCase().split('').sort().join('')) === secondString.toLowerCase().split('').sort().join('')

const checkPermutationO_n = (firstString, secondString) => {
  if (firstString.length !== secondString.length) {
    return false;
  }

  const count = {};

  for (let i = 0; i < firstString.length; i++) {
    const charFirst = firstString[i].toLowerCase();
    const charSecond = secondString[i].toLowerCase();

    count[charFirst] = (count[charFirst] || 0) + 1;
    count[charSecond] = (count[charSecond] || 0) - 1;
  }

  for (const key in count) {
    if (count[key] !== 0) {
      return false;
    }
  }

  return true;
};