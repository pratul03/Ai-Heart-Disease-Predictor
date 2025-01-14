"use client"; // Mark as a Client Component

import { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface UploadPhotoProps {
  onUpload: (url: string) => void; // Callback to handle the uploaded image URL
}

export default function UploadPhoto({ onUpload }: UploadPhotoProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div>
      {/* Cloudinary Upload Widget */}
      <CldUploadWidget
        uploadPreset="ml_upload_preset" // Replace with your Cloudinary upload preset
        onSuccess={(result: any) => {
          const url = result.info.secure_url; // Get the uploaded image URL
          setImageUrl(url); // Set the image URL in state
          onUpload(url); // Pass the URL to the parent component
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
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
        )}
      </CldUploadWidget>

      {/* Display the uploaded image */}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <CldImage
            src={imageUrl}
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
