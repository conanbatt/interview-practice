import { powerSet } from "../../44_powerSet";

describe("powerSet", () => {
  test("returns correct power set for a given set", () => {
    const set1 = [1, 2, 3];
    const expectedPowerSet1 = [
      [],
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 3],
      [2],
      [2, 3],
      [3],
    ];
    expect(powerSet(set1).sort()).toEqual(expectedPowerSet1.sort());

    const set2: number[] = [];
    const expectedPowerSet2: number[][] = [[]];
    expect(powerSet(set2).sort()).toEqual(expectedPowerSet2.sort());
  });

  test("returns correct power set for 4", () => {
    const set1 = [1, 2, 3, 4];
    const expectedPowerSet1 = [
      [1],
      [1, 4],
      [1, 3, 4],
      [1, 3],
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 4],
      [1, 2],
      [2],
      [2, 4],
      [2, 3, 4],
      [2, 3],
      [3],
      [3, 4],
      [4],
      [],
    ];
    expect(powerSet(set1).sort()).toEqual(expectedPowerSet1.sort());
  });
});
