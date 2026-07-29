import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "hercodeherstory_admin_session";

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "change-this-session-secret";
}

export function createAdminSessionValue(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const signature = createHmac("sha256", getSessionSecret()).update(normalizedEmail).digest("hex");
  return `${normalizedEmail}.${signature}`;
}

export function isValidAdminSession(value?: string) {
  if (!value) {
    return false;
  }

  const [email, signature] = value.split(".");
  if (!email || !signature) {
    return false;
  }

  const expected = createAdminSessionValue(email).split(".")[1];
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  return signatureBuffer.length === expectedBuffer.length && timingSafeEqual(signatureBuffer, expectedBuffer);
}

export { SESSION_COOKIE };
