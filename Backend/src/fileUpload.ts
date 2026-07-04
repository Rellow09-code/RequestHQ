import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

// Configure ONCE (outside function)
cloudinary.config({
  cloud_name: "donb9wx88",
  api_key: "232774535524376",
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});
console.log(process.env.CLOUDINARY_SECRET)

export async function uploadToCloud(filePath: string, public_id: string) {
  try {
    // Upload image
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id,
      folder: "requesthq",
    });

    // image URL
    const imageUrl = uploadResult.secure_url;

    return imageUrl;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
}