const TOKEN_KEY = 'token';

export function storeToken (token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function retrieveToken (): string | null {
  return sessionStorage.getItem(TOKEN_KEY) || null;
}

export function clearToken () {
  sessionStorage.removeItem(TOKEN_KEY);
}
