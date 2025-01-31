import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/connect";
import { NextResponse } from "next/server";

// api to update a user score using name
export const POST  = async (req, {params}) => {
    try {
        const {name,score} = await req.json();
        await connectToDB();
        const user = await User.findOne({name: name});
        if (!user) {
            return NextResponse.json({error: "User not found", success:false}, {status: 404});
        }
        if(score < 0){
            return NextResponse.json({error: "Score cannot be negative", success:false}, {status: 400});
        }
        if(score===0){
            return NextResponse.json({message: "User score updated", user, success:true}, {status: 200});
        }
        user.score += score;    
        await user.save({validateBeforeSave: false});
        return NextResponse.json({message: "User score updated", user, success:true}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error?.message||"server error while updating user score", success:false}, {status: 500});
    }
}


