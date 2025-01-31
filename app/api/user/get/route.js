import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/connect";
import { NextResponse } from "next/server";

// api to get a user detail using name
export const POST = async (req, {params}) => {
    try {
        const { name } = await req.json();  
        await connectToDB();
        const user = await User.findOne({name: name});
        if (!user) {    
            return NextResponse.json({error: "User not found",success:false}, {status: 404});
        }
        return NextResponse.json({message: "User found", user,success:true}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error?.message||"server error while getting user",success:false}, {status: 500});
    }
}