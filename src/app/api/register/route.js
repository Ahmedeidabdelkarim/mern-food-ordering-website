import mongoose from "mongoose";
import User from "../../models/user";

export async function POST(req) {
    const body = await req.json();
    
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const pass=body.password;
        if(!pass?.length || pass.length<5){
            new Error('password must be at least 5 characters')
        }
        const createdUser = await User.create(body);
        return Response.json(createdUser);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}