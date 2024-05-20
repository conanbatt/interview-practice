import { powerSet } from "../44_powerSet";

describe('powerSet', () => {
    test('returns correct power set for a given set', () => {
        const set1 = [1, 2, 3];
        const expectedPowerSet1 = [
            [], [1], [1, 2], [1, 2, 3],
            [1, 3], [2], [2, 3], [3]
        ];
        expect(powerSet(set1)).toEqual(expectedPowerSet1);

        const set2: number[] = [];
        const expectedPowerSet2: number[][] = [[]];
        expect(powerSet(set2)).toEqual(expectedPowerSet2);
    });
});
