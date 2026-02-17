import checkPermutations from "../../02_checkPermutations";

describe('02 - checkPermutation', () =>{
    test('Returns true for permutations with same length strings', () =>{
        expect(checkPermutations('abc','cba')).toEqual(true);
    });

    test('Returns false for strings with different lengths', () =>{
        expect(checkPermutations('abc','cbad')).toEqual(false);
    });

    test('Returns true for permutations with special characters', () =>{
        expect(checkPermutations('abc!','!bac')).toEqual(true);
    });

    test('Returns false for non-permutations with special characters', () =>{
        expect(checkPermutations('abc!','!bcd')).toEqual(false);
    });

    test('Returns true for empty strings', () =>{
        expect(checkPermutations('','')).toEqual(true);
    });

    test('Returns true for long strings with same characters', () =>{
        expect(checkPermutations('a'.repeat(1000),'a'.repeat(1000))).toEqual(true);
    });

    test('Returns false for long strings with different characters', () =>{
        expect(checkPermutations('a'.repeat(1000),'b'.repeat(1000))).toEqual(false);
    });

    test('Returns false for non-permutations with subgroup in the second one -it prevents uncomplete solutions-', () =>{
        expect(checkPermutations('abc','bc')).toEqual(false);
    });
})
