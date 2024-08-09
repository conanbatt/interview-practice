import { describe, it, expect } from "vitest";
import isUnique from "./is-unique";
import { checkPermutation } from "./check-permutation";
import URLify from "./urlify";
import isPalindromePermutation from "./palindrome-permutation";
import zeroMatrix from "./zero-matrix";
import stringRotation from "./string-rotation";
import rotateMatrix from "./rotate-matrix";
import stringCompression from "./string-compression";
import oneAway from "./one-away";

describe("isUnique", () => {
  it("should return true for an empty string", () => {
    expect(isUnique("")).toBe(true);
  });

  it("should return true for a string with all unique characters", () => {
    expect(isUnique("abcdef")).toBe(true);
  });

  it("should return false for a string with duplicate characters", () => {
    expect(isUnique("aabbcc")).toBe(false);
  });

  it("should return true for a string with mixed case unique characters", () => {
    expect(isUnique("aAbBcC")).toBe(true);
  });

  it("should return false for a string with mixed case duplicate characters", () => {
    expect(isUnique("aAbBcCa")).toBe(false);
  });
});

describe("checkPermutation", () => {
  it("should return true for two empty strings", () => {
    expect(checkPermutation("", "")).toBe(true);
  });

  it("should return true for permutations", () => {
    expect(checkPermutation("abc", "bca")).toBe(true);
  });

  it("should return false for non-permutations", () => {
    expect(checkPermutation("abc", "def")).toBe(false);
  });

  it("should return false for strings of different lengths", () => {
    expect(checkPermutation("abc", "abcd")).toBe(false);
  });

  it("should return true for permutations with repeated characters", () => {
    expect(checkPermutation("aabbcc", "baccab")).toBe(true);
  });

  it("should return false for strings with same characters but different counts", () => {
    expect(checkPermutation("aabbcc", "abbcc")).toBe(false);
  });
});

describe("urlify", () => {
  it("should replace spaces with %20", () => {
    expect(URLify("Mr John Smith ")).toBe("Mr%20John%20Smith");
  });

  it("should handle leading and trailing spaces", () => {
    expect(URLify("  Mr John Smith  ")).toBe("Mr%20John%20Smith");
  });

  it("should handle a string with no spaces", () => {
    expect(URLify("MrJohnSmith")).toBe("MrJohnSmith");
  });
});

describe("isPalindromePermutation", () => {
  it("should return true for a palindrome permutation", () => {
    expect(isPalindromePermutation("Tact Coa")).toBe(true);
  });

  it("should return false for a non-palindrome permutation", () => {
    expect(isPalindromePermutation("Hello")).toBe(false);
  });

  it("should handle empty string", () => {
    expect(isPalindromePermutation("")).toBe(true);
  });

  it("should handle strings with only one character", () => {
    expect(isPalindromePermutation("a")).toBe(true);
  });

  it("should return true for strings that are palindromes", () => {
    expect(isPalindromePermutation("racecar")).toBe(true);
  });
});

describe("oneAway", () => {
  it("should return true for zero edits away", () => {
    expect(oneAway("pale", "pale")).toBe(true);
  });

  it("should return true for one edit away", () => {
    expect(oneAway("pale", "ple")).toBe(true);
    expect(oneAway("pales", "pale")).toBe(true);
    expect(oneAway("pale", "bale")).toBe(true);
    expect(oneAway("aaa", "abaa")).toBe(true);
  });

  it("should return false for more than one edit away", () => {
    expect(oneAway("pale", "bake")).toBe(false);
    expect(oneAway("pale", "lape")).toBe(false);
    expect(oneAway("accaa", "abaa")).toBe(false);
  });

  it("should return false for strings with different lengths more than one", () => {
    expect(oneAway("pale", "paleeee")).toBe(false);
    expect(oneAway("paleeeee", "pale")).toBe(false);
  });

  it("should return true for one insert away", () => {
    expect(oneAway("pale", "palee")).toBe(true);
  });
});

describe("stringCompression", () => {
  it("should compress the string correctly", () => {
    expect(stringCompression("aabcccccaaa")).toBe("a2b1c5a3");
    expect(stringCompression("aabcccccaaaf")).toBe("a2b1c5a3f1");
  });

  it("should return original string if compressed version is not smaller", () => {
    expect(stringCompression("abcdef")).toBe("abcdef");
  });

  it("should handle empty string", () => {
    expect(stringCompression("")).toBe("");
  });

  it("should handle single character strings", () => {
    expect(stringCompression("a")).toBe("a");
  });

  it("should handle strings with no repeats", () => {
    expect(stringCompression("abcd")).toBe("abcd");
  });
});

describe("rotateMatrix", () => {
  it("should rotate the matrix by 90 degrees", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ];
    expect(rotateMatrix(matrix)).toEqual(result);
  });

  it("should handle an empty matrix", () => {
    expect(rotateMatrix([])).toEqual([]);
  });

  it("should handle a single element matrix", () => {
    const matrix = [[1]];
    const result = [[1]];
    expect(rotateMatrix(matrix)).toEqual(result);
  });

  it("should rotate a 2x2 matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const result = [
      [3, 1],
      [4, 2],
    ];
    expect(rotateMatrix(matrix)).toEqual(result);
  });
});

describe("zeroMatrix", () => {
  it("should set entire row and column to zero if an element is zero", () => {
    const matrix = [
      [1, 2, 3],
      [4, 0, 6],
      [7, 8, 9],
    ];
    const result = [
      [1, 0, 3],
      [0, 0, 0],
      [7, 0, 9],
    ];
    expect(zeroMatrix(matrix)).toEqual(result);
  });

  it("should handle matrix without zeros", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(zeroMatrix(matrix)).toEqual(result);
  });

  it("should handle an empty matrix", () => {
    expect(zeroMatrix([])).toEqual([]);
  });

  it("should handle matrix with all zeros", () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(zeroMatrix(matrix)).toEqual(result);
  });

  it("should handle single element zero matrix", () => {
    const matrix = [[0]];
    const result = [[0]];
    expect(zeroMatrix(matrix)).toEqual(result);
  });
});

describe("stringRotation", () => {
  it("should return true if s2 is a rotation of s1", () => {
    expect(stringRotation("waterbottle", "erbottlewat")).toBe(true);
    expect(stringRotation("waterbwttle", "erbwttlewat")).toBe(true);
  });

  it("should return false if s2 is not a rotation of s1", () => {
    expect(stringRotation("waterbottle", "bottlweater")).toBe(false);
    expect(stringRotation("waterbottlewat", "watbottlewater")).toBe(false);
  });

  it("should handle empty strings", () => {
    expect(stringRotation("", "")).toBe(true);
  });

  it("should handle single character strings", () => {
    expect(stringRotation("a", "a")).toBe(true);
  });

  it("should return false for strings of different lengths", () => {
    expect(stringRotation("waterbottle", "erbottlewata")).toBe(false);
  });
});
