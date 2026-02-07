import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User, MapPin, Phone, Briefcase, UserCheck } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('JOBSEEKER');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');


    let data = {
        name: name,
        email: email,
        phone: phone,
        city: city,
        password: password,
        role: role
    }

    const { register } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register({ ...data, role });
            // Redirect to login or auto-login (depends on context logic, but let's go to login for now)
            window.location.href = "/login";
        } catch (error) {
            console.error("Register Error:", error);
            alert(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
                    <form className="space-y-6">

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => setRole('JOBSEEKER')}
                                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition-all ${role === 'JOBSEEKER' ? ' bg-gray-200 ring-1 ring-primary hover:border-gray-300' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <UserCheck className={`h-8 w-8 mb-2 ${role === 'JOBSEEKER' ? 'text-secondary' : 'text-gray-400'}`} />
                                    <span className={`text-sm font-bold ${role === 'JOBSEEKER' ? 'text-secondary' : 'text-gray-500'}`}>Job Seeker</span>
                                </div>
                                <div
                                    onClick={() => setRole('RECRUITER')}
                                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition-all ${role === 'RECRUITER' ? ' bg-gray-200 ring-1 ring-primary hover:border-gray-300' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <Briefcase className={`h-8 w-8 mb-2 ${role === 'RECRUITER' ? 'text-primary' : 'text-gray-400'}`} />
                                    <span className={`text-sm font-bold ${role === 'RECRUITER' ? 'text-primary' : 'text-gray-500'}`}>Recruiter</span>
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" required className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-50/50" placeholder="John Doe" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" required className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-50/50" placeholder="name@example.com" />
                            </div>
                        </div>

                        {/* Mobile Number & City Row */}
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="tel" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" required className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-50/50" placeholder="+1 (555) 987-6543" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="text" value={city} name="city" onChange={(e) => setCity(e.target.value)} id="city" required className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-50/50" placeholder="New York" />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="password" id="password" name='passward' value={password} onChange={(e) => setPassword(e.target.value)} required className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-50/50" placeholder="••••••••" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleRegister}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === 'RECRUITER' ? 'bg-primary hover:bg-indigo-700 focus:ring-primary' : 'bg-primary hover:bg-indigo-700 focus:ring-primary'}`}
                            >
                                Register as {role === 'RECRUITER' ? 'Recruiter' : 'Job Seeker'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
