export function normalizeFormData(body: Record<string, any>, arrayFields: string[]) {
  for (const field of arrayFields) {
    if (body[field] !== undefined && typeof body[field] === 'string') {
      body[field] = [body[field]];
    }
  }
  return body;
}
