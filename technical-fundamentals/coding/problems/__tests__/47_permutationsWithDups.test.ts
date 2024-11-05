import { permutationsWithoutDups, permutationsWithDups } from "../47_permutationsWithDups";

describe('permutationsWithoutDups', () => {
    test('returns correct permutations for a string of unique characters', () => {
        // Test case with a string of length 3
        const result1 = permutationsWithoutDups('abc');
        const expectedPermutations1 = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'];
        expect(result1).toEqual(expect.arrayContaining(expectedPermutations1));
    });
});


describe('permutationsWithDups', () => {
    test('returns correct permutations for a string with duplicate characters', () => {
        // Test case with a string of length 3 with duplicate characters
        const result1 = permutationsWithDups('aab');
        const expectedPermutations1 = ['aab', 'aba', 'baa'];
        expect(result1).toEqual(expect.arrayContaining(expectedPermutations1));

        // Test case with a string of length 4 with duplicate characters
        const result2 = permutationsWithDups('aabb');
        const expectedPermutations2 = [
            'aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa'
        ];
        expect(result2).toEqual(expect.arrayContaining(expectedPermutations2));
    });
});