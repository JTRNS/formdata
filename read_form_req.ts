import {entriesToObject} from './entries_to_object.ts';

export async function readFormRequest(request: Request) {
  if (request.method === 'GET') {
    const urlSearchParams = new URL(request.url).searchParams;
    return entriesToObject(urlSearchParams);
  }

  if (request.method === 'POST') {
    const contentType = request.headers.get('Content-Type');
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      return entriesToObject(formData);
    } else if (
      contentType?.includes('application/x-www-form-urlencoded')
    ) {
      const body = await request.text();
      const urlSearchParams = new URLSearchParams(body);
      return entriesToObject(urlSearchParams);
    }
  }

  throw new Error('Unsupported method or content type');
}
