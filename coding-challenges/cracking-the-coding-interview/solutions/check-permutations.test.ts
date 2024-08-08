import { it, expect } from "vitest";
import { checkPermutations } from "./check-permutations";

it("returns true when one is a permutation of the other", () => {
  expect(checkPermutations("asd", "dsa")).toBe(true);
  expect(checkPermutations("asd", "asd")).toBe(true);
  expect(
    checkPermutations(
      "asidjaoisjdoasijdfoasfghnsaoihfaosidjaofgnauwief",
      "aofgnauwiefasidjaoisjdoasijdfoasfghnsaoihfaosidj"
    )
  ).toBe(true);
});
it("returns false when one is not permutation of the other", () => {
  expect(checkPermutations("asd", "ssd")).toBe(false);
  expect(checkPermutations("asd", "asdd")).toBe(false);
  expect(
    checkPermutations(
      "asdijasoidjaiosjdoaisfioashfoiasjdoihasfuew",
      "asdijasoidjaiosjdoaisffoashfoiasjdoihasfuew"
    )
  ).toBe(false);
});
