import type {z, ZodSchema} from './deps.ts';
import {entriesToObject} from './entries_to_object.ts';
import {readFormRequest} from './read_form_req.ts';

export async function parseFormRequest<T extends ZodSchema>(
  request: Request,
  schema: T
): Promise<z.infer<T>> {
  const record = await readFormRequest(request);
  const result = await schema.safeParseAsync(record);
  if (result.success === false) {
    throw result as z.SafeParseError<T>;
  }
  const data = result.data as z.infer<T>;
  return data;
}

export function parseFormData<T extends ZodSchema>(
  formData: FormData,
  schema: T
): z.infer<T> {
  const record = entriesToObject(formData);
  const result = schema.safeParse(record);
  if (result.success === false) {
    throw result as z.SafeParseError<T>;
  }
  const data = result.data as z.infer<T>;
  return data;
}
