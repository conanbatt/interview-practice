export default function rotateMatrix(m: number[][]) {
  const o = new Array(m.length).fill(0).map((_, i) => new Array(m[i].length));

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      o[j][m.length - i - 1] = m[i][j];
    }
  }
  return o;
}
