// 4. *Palindrome Permutation*: 

// Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters.
// The palindrome does not need to be limited to just dictionary words.
// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco cta", etc.)
// ```

export default function palindromePermutation (str: string): boolean {

    //worst case time complexity = O(2n) -> O(n)

    let charMap: Map<string, number> = new Map();
    for (let i = 0; i < str.length; i++) {
        if(str[i] === ' ') continue;
        const currChar = str[i].toLowerCase();
        if(charMap.has(currChar)){
            charMap.set(currChar, charMap.get(currChar) + 1);
        } else {
            charMap.set(currChar, 1);
        }
    }

    let oddValues: number = 0;

    for(const [_, number] of charMap){
        if(number % 2 !== 0 && oddValues > 0) {
            return false;
        } else if(number % 2 !== 0){
            oddValues++;
        }
    }

    return true;

}