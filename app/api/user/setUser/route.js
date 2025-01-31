import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/connect";
import { NextResponse } from "next/server";

// api to create a new user and set the user in local storage
export const POST = async (req, res) => {
    try {
        const {name} = await req.json();
        if(!name){
            return NextResponse.json({error: "Name is required",success:false}, {status: 400});
        }
        await connectToDB()
        const user = await User.findOne({name});
        if(user){
            return NextResponse.json({error: "User already exists",success:false}, {status: 400});
        }
        await User.create({name});
        return NextResponse.json({message: "User created successfully",success:true}, {status: 201});
    } catch (error) {
        return NextResponse.json({error: error?.message||"server error while creating user",success:false}, {status: 500});
    }
}
