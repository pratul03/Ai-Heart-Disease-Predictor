import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  sex: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  avatar: string;
  badges: string[];
  createdAt: Date;
}

const defaultAvatar =
  "https://res.cloudinary.com/dxnodvf4b/image/upload/v1736857549/avatar3_h74xpz.png";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: "Invalid email format.",
    },
  },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true, // Ensure type is always present
    },
    coordinates: {
      type: [Number],
      required: false,
      default: [20.5937, 78.9629], // Default coordinates if not provided
      validate: {
        validator(coordinates: [number, number]) {
          coordinates = [20.5937, 78.9629];
          return (
            Array.isArray(coordinates) &&
            coordinates.length === 2 &&
            coordinates[0] >= -180 &&
            coordinates[0] <= 180 &&
            coordinates[1] >= -90 &&
            coordinates[1] <= 90
          );
        },
        message: "Invalid coordinates.",
      },
    },
  },
  avatar: { type: String, default: defaultAvatar },
  badges: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Create a 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data from JSON output
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// Geospatial query helper
userSchema.statics.findNearby = function (
  coordinates: [number, number],
  maxDistance: number
) {
  return this.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  });
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
