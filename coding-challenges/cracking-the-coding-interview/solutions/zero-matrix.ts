export default function zeroMatrix(m: number[][]) {
  let o = new Array(m.length).fill(new Array(m.length).fill(0));

  // only works for a single 0
  // let zIndex = -1;
  // let col = -1;
  // for (let i = 0; i < m.length; i++) {
  //   zIndex = m[i].indexOf(0);

  //   if (zIndex === -1) {
  //     o[i] = m[i];
  //   } else {
  //     col = zIndex;
  //   }
  // }

  // // clear column
  // if (col !== -1) {
  //   for (let i = 0; i < o.length; i++) {
  //     o[i][col] = 0;
  //   }
  // }

  // return o;

  const cols = new Set<number>();

  for (let i = 0; i < m.length; i++) {
    const zeros = m[i].reduce((acc, curr, col) => {
      if (curr === 0) acc.push(col);

      return acc;
    }, [] as number[]);

    if (zeros.length < 1) {
      o[i] = m[i];
    } else {
      zeros.forEach((z) => cols.add(z));
    }
  }

  for (let col of cols) {
    for (let i = 0; i < m.length; i++) {
      o[i][col] = 0;
    }
  }

  return o;
}
