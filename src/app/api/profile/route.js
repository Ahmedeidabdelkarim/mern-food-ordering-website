import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOption/authOption";
import User from "@/app/models/user";
import UserInfo from "@/app/models/UserInfo";

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    let filterUser;

    if (_id) {
      filterUser = { _id };
    } else {
      filterUser = {
        email: session.user.email,
      };
    }

    const user = await User.findOne(filterUser).lean();

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userInfo = await UserInfo.findOne({
      email: user.email,
    }).lean();

    return Response.json({
      ...user,
      ...userInfo,
    });
  } catch (error) {
    console.error("Profile GET error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const data = await req.json();

    const {
      _id,
      name,
      image,
      ...otherUserInfo
    } = data;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let filter;

    if (_id) {
      filter = { _id };
    } else {
      filter = {
        email: session.user.email,
      };
    }

    const user = await User.findOne(filter);

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await User.updateOne(
      filter,
      {
        name,
        image,
      }
    );

    await UserInfo.findOneAndUpdate(
      { email: user.email },
      otherUserInfo,
      {
        upsert: true,
        new: true,
      }
    );

    return Response.json(true);
  } catch (error) {
    console.error("Profile PUT error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}