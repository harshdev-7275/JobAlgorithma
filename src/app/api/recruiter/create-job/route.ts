import { z } from "zod";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function POST(req: Request) {
  const bodySchema = z.object({
    userId: z.string(),
    title: z.string(),
    location: z.string(),
    salary: z.string(),
    description: z.string(),
    companyName: z.string(),
    designation: z.string(),
  });

  try {
    // Parse the incoming request body
    const body = await req.json();
    console.log(body);
    const parsedBody = bodySchema.safeParse(body);
    console.log("parsedBody", parsedBody);


    if (!parsedBody.success) {
      console.error("Validation Errors:", parsedBody.error.errors);

      // Handle schema validation error
      return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    // Convert salary from string to integer
    const salary = parseInt(parsedBody.data.salary, 10);
    if (isNaN(salary)) {
      // Handle invalid salary conversion
      return NextResponse.json({ success: false, message: "Invalid salary value. Salary must be a valid integer." }, { status: 400 });
    }
    console.log("Job data", {
      title: parsedBody.data.title,
      location: parsedBody.data.location,
      salary: salary,
      description: parsedBody.data.description,
      companyName: parsedBody.data.companyName,
      userId: parsedBody.data.userId,
      designation: parsedBody.data.designation,
    });


    const newJob = await prisma.job.create({
      data: {
        title: parsedBody.data.title ,
        location: parsedBody.data.location,
        salary: salary,
        description: parsedBody.data.description,
        companyName: parsedBody.data.companyName,
        userId: parsedBody.data.userId,
        designation: parsedBody.data.designation
      },
    });

    // Return success response
    return NextResponse.json({ success: true, message: "Job created successfully", job: newJob }, { status: 201 });
  } catch (error) {
    console.error("Failed to create job:", error);

    // Ensure the error message is properly set
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
