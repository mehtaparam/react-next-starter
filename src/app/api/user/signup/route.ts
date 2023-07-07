import { connect } from "@/app/db/db-config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log('reqBody', reqBody);

        // Check if user is already exist ?
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({
                error: "User already exist"
            }, { status: 400 })
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();

        console.log('savedUser', savedUser);

        return NextResponse.json({
            status:true,
            message:"User Created Successfully",
            user:savedUser
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });

    }

}