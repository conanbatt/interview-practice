export default function oneAway(one: string, two: string) {
  if (Math.abs(one.length - two.length) > 1) return false;

  const m = new Map();

  for (let c of one) {
    if (!m.has(c)) m.set(c, 0);

    m.set(c, m.get(c) + 1);
  }

  let misses = 0;
  for (let c of two) {
    if (!m.has(c)) misses++;

    if (misses > 1) return false;
  }

  return true;
}
