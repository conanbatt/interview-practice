// 9. *String Rotation*;

import { isSubstring } from "./__utils__/strings"

// Assume you have a method isSubstring which checks if one word is a substring of another.
// Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring.
// [e.g., "waterbottle" is a rotation of 'erbottlewat")

export default function stringRotation(s1: string, s2: string): boolean {

    if(s1.length != s2.length) return false;

    let stringEnd = "";

    for(let i = 0; i < s1.length; i++){
        if(s2[i] !== s1[0]){
            stringEnd += s2[i];
        } else {
            if(s2.substring(i) + stringEnd === s1){
                return true;
            } else {
                stringEnd += s2[i];
            }
        }
    }

    return false;

}
