import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: "Invalid email format.",
    },
  },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"], // GeoJSON type
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false,
      default: [20.5937, 78.9629], // Default coordinates if not provided
      validate: {
        validator: function (coordinates) {
          return (
            Array.isArray(coordinates) &&
            coordinates.length === 2 &&
            coordinates[0] >= -180 &&
            coordinates[0] <= 180 && // Longitude range
            coordinates[1] >= -90 &&
            coordinates[1] <= 90 // Latitude range
          );
        },
        message:
          "Invalid coordinates. Longitude must be between -180 and 180, and latitude must be between -90 and 90.",
      },
    },
  },
  avatar: { type: String, default: "default1.png" }, // New field
  badges: [{ type: String }], // New field
  createdAt: { type: Date, default: Date.now },
});

// Create a 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
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
userSchema.statics.findNearby = function (coordinates, maxDistance) {
  return this.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates,
        },
        $maxDistance: maxDistance, // Distance in meters
      },
    },
  });
};

const User = mongoose.model("User", userSchema);

export default User;
