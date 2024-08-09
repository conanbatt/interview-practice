export default function oneAway(o: string, t: string) {
  let one = o.split("");
  let two = t.split("");
  if (Math.abs(one.length - two.length) > 1) return false;

  let misses = 0;
  let i = 0;
  while (i < one.length || i < two.length) {
    let [c1] = one.splice(i, 1);
    let [c2] = two.splice(i, 1);

    if (c1 !== c2) {
      misses++;
    }

    i++;

    if (misses > 1) return false;
  }

  return true;
}
