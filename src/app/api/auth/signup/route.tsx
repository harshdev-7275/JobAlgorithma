import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";



export async function POST(req: Request) {
  try {
    const { username, name, password,role } = await req.json();
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("role in be",role);
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        role,
        password: hashedPassword,
      },
    });
    console.log("role in be",newUser);

    return NextResponse.json({ success : true, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
