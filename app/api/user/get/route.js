import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/connect";
import { NextResponse } from "next/server";

const allowedOrigin = process.env.HOST; // Frontend URL

// Handle CORS for OPTIONS request
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin, 
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        },
    });
}

// Helper function to add CORS headers
function createCORSResponse(data, status = 200) {
    return new NextResponse(JSON.stringify(data), {
        status,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
        },
    });
}

// POST request to get user details by name
export async function POST(req) {
    try {
        const { name } = await req.json();
        if (!name) {
            return createCORSResponse({ success: false, error: "Name is required" }, 400);
        }

        await connectToDB();
        const user = await User.findOne({ name });

        if (!user) {
            return createCORSResponse({ success: false, error: "User not found" }, 404);
        }

        return createCORSResponse({ success: true, message: "User found", user }, 200);
    } catch (error) {
        return createCORSResponse({ success: false, error: error.message || "Server error" }, 500);
    }
}
