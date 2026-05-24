import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
  validateCredentials,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

interface LoginBody {
  username?: string;
  password?: string;
}

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const username =
    typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "missing_credentials" }, { status: 400 });
  }

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = await createSessionToken(username);
  if (!token) {
    return NextResponse.json({ error: "auth_not_configured" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true, user: { username } });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
