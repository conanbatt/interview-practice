export default function rotateMatrix(m: number[][]) {
  // const o = new Array(m.length).fill(0).map((_, i) => new Array(m[i].length));

  // for (let i = 0; i < m.length; i++) {
  //   for (let j = 0; j < m[i].length; j++) {
  //     o[j][m.length - i - 1] = m[i][j];
  //   }
  // }
  // return o;

  for (let i = 0; i < m.length; i++) {
    for (let j = i + 1; j < m[i].length; j++) {
      [m[j][i], m[i][j]] = [m[i][j], m[j][i]];
    }
  }

  m.forEach((r) => r.reverse());

  // 1 2   3 2
  // 3 4   4 1

  // 1 2 5  3 2
  // 3 4 6  4 1
  // 7 8 9

  return m;
}
