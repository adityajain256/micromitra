import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const EditProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        city: '',
        password: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await fetch("http://localhost:5001/api/users/profile", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setFormData(prev => ({
                        ...prev,
                        name: data.message.name || '',
                        number: data.message.number || '', // Assuming backend provides 'number' or 'phoneNumber'
                        city: data.message.city || ''
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem("token");

        try {
            // Filter out empty password if not changing
            const payload = { ...formData };
            if (!payload.password) delete payload.password;

            const response = await fetch("http://localhost:5001/api/users/profileUpdate", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                alert("Profile updated successfully!");
                navigate('/dashboard');
            } else {
                alert(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("An error occurred while updating profile");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your personal information below.</CardDescription>
                </CardHeader>
                <Link to="/update-picture" className='flex justify-center h-10'>
                    <Avatar>
                        <AvatarImage
                            src={localStorage.getItem("userPic")}
                            alt="@shadcn"
                            className="zink"
                        />
                        <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                </Link>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="number">Phone Number</Label>
                            <Input
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="+91 9876543210"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="New Delhi"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password (Optional)</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" onClick={() => navigate('/dashboard')}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div >
    );
};

export default EditProfile;
