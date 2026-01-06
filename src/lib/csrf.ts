export async function getCsrfToken() {
  const response = await fetch('/api/csrf-token');
  const { csrfToken } = await response.json();
  return csrfToken;
}

export function validateCsrfToken(token: string) {
  // In a real app, this would verify the token against your session
  return typeof token === 'string' && token.length > 0;
}
