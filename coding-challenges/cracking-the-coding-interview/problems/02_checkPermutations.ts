// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.

function sortString(s: string): string {
    return s.split('').sort().join('');
}

export default function checkPermutations(s1: string, s2: string): boolean {
    if( s1.length !== s2.length) return false;

    const str1 = sortString(s1);
    const str2 = sortString(s2);

    return str1 === str2;
}
