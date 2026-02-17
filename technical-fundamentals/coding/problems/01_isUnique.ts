// 1. *Is Unique*:

// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

export default function isUnique(str: string): boolean {

    const sorted = str.split("").sort().join("");
    let prev = null;
    for(let i = 0; i < sorted.length; i++) {
        if(sorted[i] === prev) return false;
        prev = sorted[i];
    }
    return true;

}

export function tsSimple(str: string){
    const map: Record<string, boolean> = {};
    for(let i = 0; i < str.length; i++) {
        if(map[str[i]]) {
            return false;
        } else{
            map[str[i]] = true;
        }
    }
    return true;
}

const pureJSSimple = function(str){
    const map = {};
    for(let i = 0; i < str.length; i++) {
        console.log(map[str[i]]);
        if(map[str[i]] === true) {
            return false;
        } else{
            map[str[i]] = true;
        }
    }
    return true;
}
