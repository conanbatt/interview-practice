// 5. *One Away*:

// There are three types of edits that can be performed on strings:
// insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

export default function isOneAway(str1: string, str2: string): boolean {

    if(str1.length > str2.length + 2 || str1.length < str2.length - 2) return false;
    if(str1 === str2) return true;

    for(let i = 0; i < str1.length; i++){
        if(str1[i] !== str2[i]){
            return equalsWithDelete(str1.substring(i), str2.substring(i)) ||
                equalsWithInsert(str1.substring(i), str2.substring(i)) ||
                equalsWithReplace(str1.substring(i), str2.substring(i));
        }
    }

    return true;

}

export function equalsWithDelete(str1: string, str2: string): boolean {
    return str1.substring(1) === str2 || str1 === str2.substring(1);
}
export function equalsWithInsert(str1: string, str2: string): boolean {
    return str2[0] + str1 === str2 || str1[0] + str2 === str1;
}
export function equalsWithReplace(str1: string, str2: string): boolean {
    return str2[0] + str1.substring(1) === str2 || str1[0] + str2.substring(1) === str1;
}
