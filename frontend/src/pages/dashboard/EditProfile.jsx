import React, { useState, useEffect } from 'react';
import api from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, User, Camera } from 'lucide-react';
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
                const response = await api.get("/users/profile");
                const data = response.data;
                setFormData(prev => ({
                    ...prev,
                    name: data.message.name || '',
                    number: data.message.number || data.message.phone || '',
                    city: data.message.city || ''
                }));
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

        try {
            const payload = { ...formData };
            if (!payload.password) delete payload.password;

            await api.patch("/users/profileUpdate", payload);
            alert("Profile updated successfully!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Update error:", error);
            alert(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="flex h-screen items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg border-primary/20">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold text-foreground">Edit Profile</CardTitle>
                    <CardDescription className="text-muted-foreground">Update your personal information below.</CardDescription>
                </CardHeader>

                <div className="flex flex-col items-center -mt-0 mb-6 relative">
                    <div className="relative group">
                        <Link to="/update-picture">
                            <Avatar className="w-24 h-24 border-4 border-background shadow-md cursor-pointer hover:opacity-90 transition-opacity">
                                <AvatarImage
                                    src={localStorage.getItem("userPic")}
                                    alt="@shadcn"
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">DP</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-sm">
                                <Camera className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>
                    {/* Teal accent line */}
                    <div className="h-1 w-16 bg-primary rounded-full mt-4"></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    name="name"
                                    className="pl-9 focus-visible:ring-primary"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="number" className="text-foreground font-medium">Phone Number</Label>
                            <Input
                                id="number"
                                name="number"
                                className="focus-visible:ring-primary"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="+91 9876543210"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-foreground font-medium">City</Label>
                            <Input
                                id="city"
                                name="city"
                                className="focus-visible:ring-primary"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="New Delhi"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-foreground font-medium">New Password (Optional)</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                className="focus-visible:ring-primary"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                        <Button variant="outline" type="button" onClick={() => navigate('/dashboard')} className="border-input hover:bg-accent/10">Cancel</Button>
                        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div >
    );
};

export default EditProfile;
