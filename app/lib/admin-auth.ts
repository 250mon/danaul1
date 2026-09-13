import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// The signing secret defaults to ADMIN_PASSWORD so existing deployments keep
// working with a single env var; set ADMIN_SESSION_SECRET to rotate sessions
// without changing the password.
function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  return secret ? secret : null;
}

function sign(body: string, secret: string): string {
  return createHmac('sha256', secret).update(body).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');
  if (bufA.length !== bufB.length) {
    // Still run a comparison so the timing does not leak the length.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function isAdminConfigured(): boolean {
  return getSecret() !== null;
}

export function verifyAdminPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== 'string') return false;
  return safeEqual(password, expected);
}

/** Returns a signed `<payload>.<hmac>` token, or null if the server has no secret. */
export function issueAdminToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const payload = JSON.stringify({
    exp: Date.now() + TOKEN_TTL_MS,
    jti: randomBytes(12).toString('base64url'),
  });
  const body = Buffer.from(payload, 'utf-8').toString('base64url');
  return `${body}.${sign(body, secret)}`;
}

/** Verifies an `Authorization: Bearer <token>` header against the server secret. */
export function verifyAdminRequest(request: Request): boolean {
  const secret = getSecret();
  if (!secret) return false;

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

  const [body, signature] = authHeader.slice(7).trim().split('.');
  if (!body || !signature) return false;
  if (!safeEqual(signature, sign(body, secret))) return false;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}
