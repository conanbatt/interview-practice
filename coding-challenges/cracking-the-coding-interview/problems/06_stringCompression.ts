// 6. *String Compression*:

// Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3,
// If the "compressed" string would not become smaller than the original string,
// your method should return the original string.
// You can assume the string has only uppercase and lowercase letters (a - z).

export default function stringCompression (str: string) : string {
    const stringCompressed = str.split('').reduce((prev:string[], current) => {
        if (prev.length === 0) {
            prev.push(current);
            return prev;
        }

        if(prev?.length > 0) {
            const lastItem = prev?.pop() as string;
            const itemContent = lastItem.split('');

            if(itemContent[0] === current) {
                const newItem = itemContent[0]+(Number(itemContent[1] || 1) +1);
                prev.push(newItem);
                return prev;
            }

            prev?.push(lastItem);
            prev?.push(current);
            return prev;
        }

        return prev;
    }, []);

    return stringCompressed?.join('') as string;
}