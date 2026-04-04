import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// [C1 FIX] GET /api/auth/me — reads the HttpOnly JWT cookie, no request body needed.
// The Navbar now calls this on mount to check authentication state.
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    return NextResponse.json({
      id: session.userId,
      name: session.name,
      email: session.email,
      phone: session.phone,
      isAdmin: session.isAdmin ?? false,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}