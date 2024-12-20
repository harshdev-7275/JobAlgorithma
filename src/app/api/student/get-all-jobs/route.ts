import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await prisma.job.findMany()
        return NextResponse.json({
            success: true,
            data: res
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 500 })
        
    }
}