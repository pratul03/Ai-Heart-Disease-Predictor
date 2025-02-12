"use client"; // Mark as a Client Component

import { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface UploadPhotoProps {
  onUpload: (url: string) => void; // Callback to handle the uploaded image URL
}

export default function UploadPhoto({ onUpload }: UploadPhotoProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const defaultAvatarUrl =
    "https://res.cloudinary.com/dxnodvf4b/image/upload/v1736857549/avatar3_h74xpz.png";

  return (
    <div className="cursor-pointer">
      {/* Cloudinary Upload Widget */}
      <CldUploadWidget
        uploadPreset="my_preset"
        options={{ sources: ["local", "url", "unsplash", "google_drive"] }}
        onSuccess={(result: any) => {
          console.log("Upload result:", result); // Debug the result
          const url = result.info.secure_url; // Get the uploaded image URL
          if (url) {
            setImageUrl(url); // Set the image URL in state
            onUpload(url); // Pass the URL to the parent component
          } else {
            console.error("Failed to get a valid image URL from Cloudinary.");
          }
        }}
        onError={(error) => {
          console.error("Upload error:", error); // Log any errors
        }}
        onOpen={() => {
          console.log("Cloudinary widget opened successfully."); // Log when the widget opens
        }}
      >
        {({ open }) => {
          console.log("Render function called, open function:", open); // Debug the open function
          return (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                open();
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Photo
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Display the uploaded image */}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <CldImage
            src={imageUrl || defaultAvatarUrl} // Use the uploaded image or a fallback
            width="150"
            height="150"
            alt="Uploaded Photo"
            style={{ borderRadius: "50%" }}
          />
        </div>
      )}
    </div>
  );
}
