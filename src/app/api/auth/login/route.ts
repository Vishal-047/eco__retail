import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authenticateUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { emailOrPhone, password } = await req.json();
    
    let user = await User.findOne({ email: emailOrPhone.toLowerCase() });
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // [SECURITY FIX] Verify hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // [SECURITY FIX] Generate JWT and set HttpOnly Cookie
    await authenticateUser(user);

    return NextResponse.json({ 
      success: true, 
      user: { id: user._id, name: user.name, phone: user.phone, email: user.email } 
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}