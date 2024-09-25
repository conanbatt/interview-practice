import {
  findMagicIndexDistinct,
  findMagicIndexNonDistinct,
} from "../43_magicIndex";

describe("magic index", () => {
    test("returns correct magic index for distinct input", () => {
      expect(findMagicIndexDistinct([-2, -1, 0, 2, 4, 6, 8])).toBe(4); // Magic index: 4

      expect(findMagicIndexDistinct([-3, -2, -1, 4, 5, 7, 9])).toBeFalsy(); // No magic index
    });
  });

  describe("not distinct", () => {
    test("returns correct magic index for non-distinct input", () => {
      // Test case where magic index exists
      expect(
        findMagicIndexNonDistinct([-10, -5, 2, 2, 2, 2, 4, 7, 9, 12, 13]),
      ).toBe(2); // Magic index: 2

      // Test case where no magic index exists
      expect(
        findMagicIndexNonDistinct([-10, -5, 0, 2, 5, 7, 9, 12, 13]),
      ).toBeUndefined(); // No magic index
    });
  });
});
