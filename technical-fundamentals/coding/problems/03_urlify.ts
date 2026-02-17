// 3.  URLify:

// Write a method to replace all spaces in a string with '%20'.
// You may assume that the string has sufficient space at the end to hold the additional characters,
// and that you are given the "true" length of the string.

export default function URLify (s1 : string[]): string[] {

    let next = s1[s1.length - 1];
    let index: number = s1.length - 1;
    while(next === ' '){
        index--;
        next = s1[index];
    }

    let pointer = s1.length - 1;

    for(let i = index; i >= 0; i--){
        if(s1[i] !== ' '){
            s1[pointer] = s1[i];
            pointer--;
        } else {
            s1[pointer] = '0';
            s1[pointer - 1] = '2';
            s1[pointer - 2] = '%';
            pointer -= 3;
        }
    }

    return s1;

}