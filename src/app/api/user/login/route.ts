import { connect } from "@/app/db/db-config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log('reqBody', reqBody);

        // Check if user is already exist ?
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                error: "User does not exist"
            }, { status: 400 })
        }

        // Check password
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({
                error: "Invalid password"
            }, { status: 400 })
        }

        // Create Token Data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const res = NextResponse.json({
            status: true,
            message: "User Logged In Successfully"
        });

        res.cookies.set("token",token,{
            httpOnly:true
        })

        return res;
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });

    }

}