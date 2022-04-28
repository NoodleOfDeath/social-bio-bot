export function enumList<E>(type: { [key: string]: E }): E[] {
  return Object.keys(type)
    .filter(t => isNaN(Number(t)))
    .map((name: string) => type[name]);
}
