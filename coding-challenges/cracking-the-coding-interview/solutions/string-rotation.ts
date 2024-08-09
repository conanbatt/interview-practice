export default function stringRotation(s: string, s2: string) {
  if (s.length !== s2.length) return false;

  if (s.length < 2) return true;

  let begin = 0;
  let c1 = s[0];
  let c2 = s2[0];
  while (c1 !== c2) {
    c2 = s2[begin];
    begin++;
  }

  let compare = s2.slice(begin - 1) + s2.slice(0, begin - 1);

  return compare === s;
}
