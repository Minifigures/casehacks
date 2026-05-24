export const SESSION_COOKIE = "utrade_session";
/** Max token lifetime while the browser session is open (cookie clears on quit). */
const SESSION_TOKEN_MAX_MS = 60 * 60 * 24 * 1000;

const encoder = new TextEncoder();

function getSecret(): string | undefined {
  const secret = process.env.AUTH_SECRET?.trim();
  return secret || undefined;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSign(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message),
  );
  return base64UrlEncode(new Uint8Array(signature));
}

export async function createSessionToken(
  userId: string,
  maxAgeMs = SESSION_TOKEN_MAX_MS,
): Promise<string | null> {
  const expiresAt = Date.now() + maxAgeMs;
  const payload = `${userId}.${expiresAt}`;
  const secret = getSecret();
  if (!secret) return null;

  const sig = await hmacSign(secret, payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(
  token: string,
): Promise<{ userId: string; expiresAt: number } | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userId, expiresAtStr, sig] = parts;
  const expiresAt = Number(expiresAtStr);
  if (!userId || Number.isNaN(expiresAt) || Date.now() > expiresAt) return null;

  const secret = getSecret();
  if (!secret) return null;

  const payload = `${userId}.${expiresAtStr}`;
  const expected = await hmacSign(secret, payload);
  if (sig !== expected) return null;

  return { userId, expiresAt };
}

/** Session cookie: cleared when the browser/app is fully closed. */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

export function validateCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.AUTH_USERNAME?.trim();
  const expectedPassword = process.env.AUTH_PASSWORD;
  if (!expectedUser || !expectedPassword) return false;
  return username === expectedUser && password === expectedPassword;
}

export function readSessionCookie(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(SESSION_COOKIE.length + 1));
}
