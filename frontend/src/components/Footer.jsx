import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 max-sm:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Micromitra</h3>
                        <p className="text-gray-500 text-sm">
                            Connecting job seekers with opportunities and helping recruiters find top talent.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">About Us</Link></li>
                            <li><Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
                            <li><Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
                            <li><Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link to="/jobseeker" className="text-base text-gray-500 hover:text-gray-900">Find Jobs</Link></li>
                            <li><Link to="/recruiter" className="text-base text-gray-500 hover:text-gray-900">Post a Job</Link></li>
                            <li><Link to="/guides" className="text-base text-gray-500 hover:text-gray-900">Career Guides</Link></li>
                            <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                                <span className="text-gray-500 text-sm">123 Business Avenue, Tech Hub, IN 400001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-gray-500 text-sm">+91 123 456 7890</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-gray-500 text-sm">contact@micromitra.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-gray-400 text-center md:text-left">
                        &copy; {new Date().getFullYear()} Micromitra. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="text-sm text-gray-400 hover:text-gray-500">Privacy</Link>
                        <Link to="/terms" className="text-sm text-gray-400 hover:text-gray-500">Terms</Link>
                        <Link to="/cookies" className="text-sm text-gray-400 hover:text-gray-500">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
