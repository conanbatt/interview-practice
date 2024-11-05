import palindromePermutation from "../../04_palindromePermutation";

describe("04 - palindromePermutation", () => {
  test("Empty string", () => {
    expect(palindromePermutation("")).toEqual(true);
  });

  test("Single character string", () => {
    expect(palindromePermutation("a")).toEqual(true);
  });

  test("Palindrome with odd length", () => {
    expect(palindromePermutation("taco cat")).toEqual(true);
  });

  test("Palindrome with even length", () => {
    expect(palindromePermutation("rdeder")).toEqual(true);
  });

  test("Non-palindrome with odd length", () => {
    expect(palindromePermutation("hello")).toEqual(false);
  });

  test("Non-palindrome with even length", () => {
    expect(palindromePermutation("world")).toEqual(false);
  });

  test("String with mixed case", () => {
    expect(palindromePermutation("RaceCar")).toEqual(true);
  });

  test("String with non-alphanumeric characters", () => {
    expect(palindromePermutation("12321")).toEqual(true);
  });

  test("String with no possible palindrome permutation", () => {
    expect(palindromePermutation("abcdefg")).toEqual(false);
  });
});
