import User from "@/models/userModel";
import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectToDB();

export const POST = async (request) => {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json("Invalid token");
  }
  return NextResponse.json({ message: "User found", data: user });
};
