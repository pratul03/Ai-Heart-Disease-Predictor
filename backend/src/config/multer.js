import multer from "multer";
import { doctorStorage, storage } from "./cloudinary.js";

const upload = multer({ storage });
const uploadDoctors = multer({ storage: doctorStorage });
export { upload, uploadDoctors };
