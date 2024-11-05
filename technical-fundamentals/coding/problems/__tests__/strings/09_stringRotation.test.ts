import stringRotation from "../../09_stringRotation";

describe("09 - stringRotation", () => {
  test("rotates a string", () => {
    const str1 = "Hello";
    const str2 = "oHell";
    const result = stringRotation(str1, str2);
    expect(result).toEqual(true);
  });

  test("rotates another string", () => {
    const str1 = "waterbottle";
    const str2 = "erbottlewat";
    const result = stringRotation(str1, str2);
    expect(result).toEqual(true);
  });
});
