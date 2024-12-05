import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';






// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    console.log("process.env.CLOUD_NAME",process.env.CLOUD_NAME);
console.log("process.env.CLOUDINARY_API_KEY",process.env.CLOUDINARY_API_KEY);
console.log("process.env.CLOUDINARY_SECRET",process.env.CLOUDINARY_SECRET);
    // Ensure temp directory exists
    const tempDir = path.join(process.cwd(), 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    // Parse the form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a temporary file path
    const filePath = path.join(tempDir, file.name);
    await fs.writeFile(filePath, buffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(filePath, {
        folder: 'uploads',
        // Optional: add more Cloudinary upload options if needed
        resource_type: 'auto', // Automatically detect resource type
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
    console.log(" result",result);

    // Clean up temporary file
    await fs.unlink(filePath);

    return NextResponse.json({ 
      success: true, 
      data: {
        url: result,
        public_id: result
      }
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}