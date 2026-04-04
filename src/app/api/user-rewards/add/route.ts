import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getSession } from "@/lib/auth";

const API_ACTION_TYPES = {
  'chat_question': { points: 5, description: 'Asked eco-friendly question' },
  'delivery_calculation': { points: 10, description: 'Calculated delivery impact' },
  'diy_project': { points: 15, description: 'Shared DIY project' },
  'eco_tip': { points: 8, description: 'Learned eco tip' },
  'carbon_footprint': { points: 12, description: 'Calculated carbon footprint' }
};

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { type, description } = await req.json();

    const actionDef = API_ACTION_TYPES[type as keyof typeof API_ACTION_TYPES];
    if (!actionDef) {
       return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }

    const newActivity = {
      type,
      description: description || actionDef.description,
      points: actionDef.points,
      date: new Date(),
      verified: true
    };

    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.points = (user.points || 0) + actionDef.points;
    user.activities.push(newActivity);
    await user.save();

    return NextResponse.json({ success: true, points: user.points, activities: user.activities });
  } catch (error) {
    console.error("Reward Add Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
