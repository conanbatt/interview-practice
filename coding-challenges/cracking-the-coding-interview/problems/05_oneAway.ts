// 5. *One Away*:

// There are three types of edits that can be performed on strings:
// insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

function getMinMaxStrings(str1:string, str2:string) {
    return str1.length >= str2.length ? [str1, str2] : [str1, str2];
}

export default function isOneAway(str1: string, str2: string): boolean {
    const [maxString, minString] = getMinMaxStrings(str1, str2);
    
    if(maxString.length - minString.length > 1) return false;
    
    const stringEvaluation = maxString.split('').reduce((prev, current, index) => {
        if(!minString.includes(current) || current !== minString[index]) prev++;
        return prev;
    }, 0);

    return stringEvaluation > 1 ? false: true;
}
