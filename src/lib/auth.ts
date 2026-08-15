import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual, randomBytes } from "crypto";

const COOKIE = "ganesha_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function issueToken(email: string): string {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const nonce = randomBytes(8).toString("base64url");
  const payload = `${Buffer.from(email).toString("base64url")}.${expiresAt}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string): { email: string } | null {
  const parts = token.split(".");
  if (parts.length !== 4) return null;

  const payload = parts.slice(0, 3).join(".");
  if (!safeEqual(parts[3], sign(payload))) return null;

  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return { email: Buffer.from(parts[0], "base64url").toString() };
}

export async function createSession(email: string) {
  const jar = await cookies();
  jar.set(COOKIE, issueToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getAdmin(): Promise<{ email: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? verifyToken(token) : null;
}

export async function requireAdmin(): Promise<{ email: string }> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
