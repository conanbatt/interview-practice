import { towersOfHanoi } from "../../46_towersOfHanoi";

describe('towersOfHanoi', () => {
    test('returns correct tower configuration after moving disks', () => {
        const result1 = towersOfHanoi(3);
        expect(result1).toEqual([[], [], [3,2,1]]); 

        const result2 = towersOfHanoi(4);
        expect(result2).toEqual([[], [], [4, 3, 2, 1]]); 

        const result3 = towersOfHanoi(5);
        expect(result3).toEqual([ [], [], [5, 4, 3, 2, 1]]); 
    });
});
