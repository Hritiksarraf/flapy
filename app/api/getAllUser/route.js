import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/connect";
import { NextResponse } from "next/server";

// api to get all users with rank for dashboard~
export const POST = async (req, _) => {
    try {
        await connectToDB();
        const users = await User.find().sort({ score: -1 }); // Sorting in descending order
        if (!users.length) {
            return NextResponse.json({ users: [], success: true }, { status: 201 });
        }
        // Assign ranks based on sorted order
        const rankedUsers = users.map((user, index) => ({
            ...user.toObject(),
            rank: index + 1, 
        }));
        console.log(rankedUsers);
        return NextResponse.json({ users: rankedUsers, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error?.message || "server error while getting users", success: false }, { status: 500 });
    }
};
