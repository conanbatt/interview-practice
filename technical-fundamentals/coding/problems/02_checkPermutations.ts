// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.

//O(n) -better but with more space complexity-
export default function checkPermutations(s1: string, s2: string): boolean {
    const letterSet: Set<string> = new Set();
    const letterMap: Record<string, number> = {};

    for (let i = 0; i < s1.length; i++) {
        letterSet.add(s1[i]);
        if(letterMap[s1[i]]) {
            letterMap[s1[i]]++;
        } else {
            letterMap[s1[i]] = 1;
        }
    }

    for (let i = 0; i < s2.length; i++) {
        if(!letterMap[s2[i]] || letterMap[s2[i]] === 0) {
            return false;
        }
        if(letterMap[s2[i]] === 1) {
            letterSet.delete(s2[i]);
        }
        letterMap[s2[i]]--;
    }

    return letterSet.size === 0;
}

//simpler solution sorting O(nlogn)
export function checkSimple(s1: string, s2: string): boolean{
    return s1.split('').sort().join('') === s2.split('').sort().join('');
}