import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/connect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; 
const HOST = process.env.HOST || "http://127.0.0.1:5500"; // Use env variable with a fallback

// Handle preflight CORS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": HOST,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

// Handle user creation
export const POST = async (req) => {
  try {
    const { name } = await req.json();
    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required", success: false }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": HOST,
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    await connectToDB();
    const user = await User.findOne({ name });

    if (user) {
      return new NextResponse(
        JSON.stringify({ error: "User-name already exists try something else", success: false }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": HOST,
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    await User.create({ name });

    // Generate JWT token with only name
    const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: "7d" });

    return new NextResponse(
      JSON.stringify({ message: "User created successfully!", success: true, token }),
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": HOST,
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error?.message || "Server error while creating user", success: false }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": HOST,
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }
};
