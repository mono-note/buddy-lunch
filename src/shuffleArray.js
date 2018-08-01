function shuffle(a) {
  let n = a.length,t,i;
  while (n) {
    i = Math.floor(Math.random() * n--);
    t = a[n];
    a[n] = a[i];
    a[i] = t;
  }
  return a;
}
export default shuffle