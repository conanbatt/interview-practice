import { recursiveMultiply } from "../45_recursiveMultiply";

describe('recursiveMultiply', () => {
    test('returns correct product for two positive integers', () => {
        // Test case with two positive integers
        expect(recursiveMultiply(3, 4)).toBe(12); // 3 * 4 = 12
        expect(recursiveMultiply(5, 7)).toBe(35); // 5 * 7 = 35
        expect(recursiveMultiply(9, 2)).toBe(18); // 9 * 2 = 18

        // Test case with one of the numbers being 0
        expect(recursiveMultiply(0, 10)).toBe(0); // 0 * 10 = 0
        expect(recursiveMultiply(8, 0)).toBe(0); // 8 * 0 = 0
    });
});
