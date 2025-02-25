export function entries<V, T extends { [key: string | number | symbol]: V }>(
  value: T
): V[] {
  return Object.entries(value) as V[];
}
