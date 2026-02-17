// 6. *String Compression*:

// Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3,
// If the "compressed" string would not become smaller than the original string,
// your method should return the original string.
// You can assume the string has only uppercase and lowercase letters (a - z).

export default function stringCompression (str: string) : string {
    let counter: number = 0;
    let prev: string = '';
    let output: string = '';
    for(let i: number = 0; i < str.length; i++){
        if(str[i] !== prev){
            if(prev != ''){
                output += prev + counter.toString();
                counter = 0;
            }
            prev = str[i];
        }
        counter++;
    }

    output += prev + counter.toString();

    return output.length < str.length ? output : str;
 
}