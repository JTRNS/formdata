import {z} from 'https://deno.land/x/zod@v3.21.4/mod.ts';
import {parseFormData, parseFormRequest} from './parse_formdata.ts';
import {assertEquals} from 'https://deno.land/std@0.203.0/assert/assert_equals.ts';

Deno.test('parse FormData', () => {
  const form = new FormData();
  form.append('name', 'John');
  form.append('email', 'john@example.com');
  form.append('dob', '1990-01-01');

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    dob: z.coerce.date(),
    adult: z.coerce.boolean().default(false),
  });

  const data = parseFormData(form, schema);

  assertEquals(data, {
    name: 'John',
    email: 'john@example.com',
    dob: new Date('1990-01-01'),
    adult: false,
  });
});

Deno.test('parse Request with FormData', async () => {
  const req = new Request('https://example.com', {
    method: 'POST',
    body: new URLSearchParams({
      name: 'John',
      email: 'john@example.com',
      dob: '1990-01-01',
    }),
  });

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    dob: z.coerce.date(),
    adult: z.coerce.boolean().default(false),
  });

  const data = await parseFormRequest(req, schema);

  assertEquals(data, {
    name: 'John',
    email: 'john@example.com',
    dob: new Date('1990-01-01'),
    adult: false,
  });
});
