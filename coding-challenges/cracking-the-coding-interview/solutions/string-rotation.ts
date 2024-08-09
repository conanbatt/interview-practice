export default function stringRotation(s: string, s2: string) {
  if (s.length !== s2.length) return false;

  if (s.length < 2) return true;

  let copy = s2;
  for (let i = 0; i < s.length; i++) {
    if (s === copy) return true;

    copy = copy.slice(1) + copy.slice(0, 1);
  }

  return false;
}
