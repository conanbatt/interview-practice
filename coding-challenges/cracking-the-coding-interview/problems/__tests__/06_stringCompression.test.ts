import stringCompression from "../06_stringCompression"

describe('06 - stringCompression', () =>{
    test('compresses string with repeated characters', () => {
        expect(stringCompression('aabcccccaaa')).toBe('a2b1c5a3');
    });

    test('returns original string if compression does not reduce length', () => {
        expect(stringCompression('abcde')).toBe('abcde');
    });

    test('returns empty string for empty input', () => {
        expect(stringCompression('')).toBe('');
    });

    test('returns single character for string with single character', () => {
        expect(stringCompression('a')).toBe('a');
    });

    test('compresses string with uppercase and lowercase letters', () => {
        expect(stringCompression('AAAbbbCCCddd')).toBe('A3b3C3d3');
    });

    test('returns original string if no repeated characters', () => {
        expect(stringCompression('abcdef')).toBe('abcdef');
    });
});
