export default function URLify(s: string) {
  const str = s.trim();
  //   return encodeURIComponent(str);
  //   return str.replace(/ /gi, "%20");
  return str.split(" ").join("%20");
}
