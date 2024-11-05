import { coinChange } from "../../48_coinChange";

describe("Coin Change", () => {
  test("returns 0 if coins are invalid or do not match", () => {
    expect(coinChange(10, [15])).toEqual(0);
    expect(coinChange(10, [])).toEqual(0);
    expect(coinChange(10, [7])).toEqual(0);
  });

  test("returns correct counts for various examples", () => {
    expect(coinChange(5, [1, 2, 5])).toEqual(4);
    expect(coinChange(10, [10])).toEqual(1);
  });
});
