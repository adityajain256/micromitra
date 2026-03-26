import React, { useState } from "react";
import api from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Folder, UploadCloud, Loader2, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const UpdatePicture = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      localStorage.removeItem("profile");
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("profilePicture", image);

    try {
      const response = await api.patch(
        "/users/uploadProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const data = response.data;
      console.log("Upload success:", data);
      alert("Profile picture updated successfully!");
      // Update auth user or local storage
      localStorage.setItem("userPic", data.message); // If message is the URL
      navigate("/dashboard");
    } catch (error) {
      console.error("Network error:", error);
      alert(error.response?.data?.message || "Failed to upload image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Update Profile Picture
          </CardTitle>
          <CardDescription>
            Choose a professional photo to display on your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUploadImage} className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <label
                htmlFor="imageInput"
                className={`
                                    relative flex flex-col items-center justify-center w-full h-64 
                                    border-2 border-dashed rounded-lg cursor-pointer 
                                    transition-all duration-300 ease-in-out
                                    ${preview ? "border-primary bg-primary/5" : "border-input hover:bg-accent/5 hover:border-primary/50"}
                                `}
              >
                {preview ? (
                  <div className="relative w-full h-full p-4 flex items-center justify-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white font-medium">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground group">
                    <div className="p-4 bg-background rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-8 h-8 text-primary" />
                    </div>
                    <p className="mb-2 text-sm font-semibold">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 3MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  id="imageInput"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading || !image}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Picture"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
