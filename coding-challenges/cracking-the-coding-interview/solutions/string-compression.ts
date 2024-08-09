//aabcccccaaaf

export default function stringCompression(str: string) {
  let count = 1;
  let output = "";

  if (str.length === 1) return str;

  // for (let i = 1; i < str.length; i++) {
  //   const char = str[i];
  //   let prev = str[i - 1];

  //   if (prev !== char) {
  //     output = `${output}${prev}${count}`;
  //     count = 1;
  //   } else if (prev === char) {
  //     count++;
  //   }

  //   if (i === str.length - 1) {
  //     output = `${output}${char}${count}`;
  //   }
  // }

  const a = str.split("");
  let prev = a.shift();
  while (a.length) {
    let char = a.shift();

    if (prev !== char) {
      output += `${prev}${count}`;
      count = 1;
    } else {
      count++;
    }

    prev = char;
  }

  // add last
  output += `${prev}${count}`;

  return output.length > str.length ? str : output;
}
