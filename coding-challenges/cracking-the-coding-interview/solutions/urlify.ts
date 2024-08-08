export default function URLify(str: string) {
  //   return encodeURIComponent(str);
  //   return str.replace(/ /gi, "%20");
  return str.split(" ").join("%20");
}
