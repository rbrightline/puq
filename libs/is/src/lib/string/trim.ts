export function trim(value: string) {
  return value.trim().replace(/\s{2,}/g, ' ');
}
