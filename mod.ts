import { collectEntries } from "./collect_entries.ts";
import { parseFormDataValue } from "./parse_values.ts";
export { type ParsedFormDataValue } from "./parse_values.ts";

/** Parses a `FormData` object and returns an object with the same keys, but with the values parsed according to their type.
 * @returns An object with keys for each unique key in the `FormData` object, and values that are either a single `ParsedFormDataValue` or an array of `ParsedFormDataValue`s.
 * @module
 */

export function parseFormData(formData: FormData) {
  return createEntriesParser(
    parseFormDataValue,
    collectEntries
  )<FormData>(formData);
}

function createEntriesParser<T, U>(
  parser: (value: T) => U,
  collector: (entries: [string, T][]) => Record<string, T | T[]>
) {
  return <V extends { entries(): IterableIterator<[string, T]> }>(
    data: V
  ): Record<string, U | U[]> => {
    const entries = Array.from(data.entries());
    const obj = collector(entries);
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.map(parser) : parser(value),
      ])
    );
  };
}
