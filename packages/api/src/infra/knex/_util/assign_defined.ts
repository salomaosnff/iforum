export function assignDefined<T extends object>(
  data: Partial<T>,
  target: T = {} as T,
) {
  for (const [
    key,
    value,
  ] of Object.entries(data)) {
    if (typeof value !== 'undefined') {
      target[key] = value;
    }
  }

  return target;
}