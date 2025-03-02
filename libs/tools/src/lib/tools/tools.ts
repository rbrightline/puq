export async function tools<T>(...args: T[]): Promise<void> {
  console.log(args);
}
