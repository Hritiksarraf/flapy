import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/connect";
import { NextResponse } from "next/server";

const HOST = process.env.HOST || "http://127.0.0.1:5500"; // Use env variable with a fallback

// Handle CORS for OPTIONS method
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": HOST, // Allow requests from the front-end domain
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific methods
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
            "Access-Control-Allow-Credentials": "true", // Allow cookies to be sent if needed
        },
    });
}

// API to update a user score using name
export const POST = async (req, { params }) => {
    try {
        // CORS Headers for POST request
        const response = NextResponse.next();
        response.headers.set("Access-Control-Allow-Origin", HOST);
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.headers.set("Access-Control-Allow-Credentials", "true");

        const { name, score, secretKey } = await req.json();

        // Validate secret key (optional, for security purposes)
        if (secretKey !== process.env.SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized access", success: false }, { status: 401 });
        }

        // Connect to the database
        await connectToDB();

        // Find the user by name
        const user = await User.findOne({ name: name });
        if (!user) {
            return NextResponse.json({ error: "User not found", success: false }, { status: 404 });
        }

        // Validate the score
        if (score < 0) {
            return NextResponse.json({ error: "Score cannot be negative", success: false }, { status: 400 });
        }

        console.log(score);
        
        user.lastScore = score;

        // Update the user's score if it's higher
        if (user.score < score) {
            user.score = score;
        }
        await user.save({ validateBeforeSave: false });
        console.log(user);

        // Respond with a success message
        return NextResponse.json({ message: "User score updated", user, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error?.message || "Server error while updating user score", success: false }, { status: 500 });
    }
};
