import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import twilio from "twilio";
import bcrypt from "bcryptjs";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { name, password, email } = await req.json();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    // [SECURITY FIX] Check if user already exists by email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email address already exists." }, { status: 409 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // [SECURITY FIX] Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      otp,
      otpExpires
    });

    await newUser.save();

    // Send OTP via Twilio SMS (Commented out for testing/direct login)
    /*
    try {
      if (accountSid && authToken && twilioPhone) {
        await client.messages.create({
          body: `Your OTP code is: ${otp}`,
          from: twilioPhone,
          to: phone,
        });
      } else {
        console.warn("Twilio credentials missing. Skipping SMS.");
      }
    } catch (err) {
      console.error("Twilio SMS error:", err);
    }
    */

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}