import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Folder, UploadCloud, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpdatePicture = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
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
        formData.append('profilePicture', image);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to upload a picture.");
                navigate('/login');
                return;
            }

            const response = await fetch("http://localhost:5001/api/users/uploadProfilePicture", {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Upload success:", data);
                alert("Profile picture updated successfully!");
                localStorage.setItem("userPic", data.message)
                navigate('/dashboard');

            } else {
                console.error("Upload failed:", data);
                alert(data.message || "Failed to upload image.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("An error occurred during upload.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className='text-2xl font-bold text-center mb-8 text-gray-800'>Update Profile Picture</h1>

                <form onSubmit={handleUploadImage} className="flex flex-col gap-6">
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="imageInput"
                            className={`
                                relative flex flex-col items-center justify-center w-full h-64 
                                border-2 border-dashed rounded-lg cursor-pointer 
                                transition-colors duration-200 ease-in-out
                                ${preview ? 'border-primary bg-gray-50' : 'border-gray-300 hover:bg-gray-50'}
                            `}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-lg p-2"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                                    <UploadCloud className="w-12 h-12 mb-4" />
                                    <p className="mb-2 text-sm font-semibold">Click to upload or drag and drop</p>
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

                    <Button
                        type="submit"
                        className="w-full py-6 text-lg"
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
                </form>

                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">Ensure your image is professional and clearly visible.</p>
                </div>
            </div>
        </div>
    );
};

export default UpdatePicture;
