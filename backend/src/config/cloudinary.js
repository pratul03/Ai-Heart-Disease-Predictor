import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { configDotenv } from "dotenv";

configDotenv();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for Multer
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
    transformation: [{ width: 150, height: 150, crop: "fill" }], // Resize and crop avatar
  },
});

// Set up Cloudinary storage for doctor images
export const doctorStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "doctors",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  },
});

export default cloudinary;
