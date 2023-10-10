/**
 * Transforms an iterable of entries into an object. Alternative to Object.fromEntries
 * that supports duplicate keys.
 */
export function entriesToObject<T>(obj: {
  entries(): Iterable<[string, T]>;
}): Record<string, T | T[]>;
export function entriesToObject<T>(
  entries: [string, T][]
): Record<string, T | T[]>;
export function entriesToObject<T>(
  arg0: [string, T][] | {entries(): Iterable<[string, T]>}
): Record<string, T | T[]> {
  const entries = Array.isArray(arg0)
    ? arg0
    : Array.from(arg0.entries());
  const object: Record<string, T | T[]> = {};
  entries.forEach(([key, value]) => {
    if (Reflect.has(object, key)) {
      const current = object[key];
      object[key] = Array.isArray(current)
        ? [...current, value]
        : [current, value];
    } else {
      object[key] = value;
    }
  });
  return object;
}
