import oneAway from "../../05_oneAway";

describe("05 - oneAway", () => {
  test("One Away - Replace", () => {
    expect(oneAway("pale", "bale")).toEqual(true); // Replacement
    expect(oneAway("bbaa", "bcca")).toEqual(false); // Replacement
  });

  test("One Away - Replace", () => {
    expect(oneAway("pale", "bale")).toEqual(true); // Replacement
  });

  test("One Away - Insert", () => {
    expect(oneAway("pale", "ple")).toEqual(true); // Insertion
  });

  test("One Away - Remove", () => {
    expect(oneAway("pale", "pales")).toEqual(true); // Removal
  });

  test("Same Strings", () => {
    expect(oneAway("abc", "abc")).toEqual(true); // No edits
  });

  test("More Than One Edit Away", () => {
    expect(oneAway("abcd", "efgh")).toEqual(false); // More than one edit away
  });

  test("Empty Strings", () => {
    expect(oneAway("", "")).toEqual(true); // Empty strings are zero edits away
  });

  test("One Character Difference", () => {
    expect(oneAway("a", "ab")).toEqual(true); // One character difference
  });

  test("Empty and Non-Empty String", () => {
    expect(oneAway("", "a")).toEqual(true); // Empty string and a non-empty string
  });
});
