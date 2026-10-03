import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-8 w-full bg-[#0b1b34] font-sans">

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* Brand */}
                    <div className="lg:col-span-2">

                        <Link to="/" className="flex items-center gap-2 w-fit">

                            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                                <span className="text-[#0b1b34] font-bold text-lg">
                                    R
                                </span>
                            </div>

                            <span className="text-xl font-semibold tracking-tight text-white">
                                RentVerse
                            </span>

                        </Link>

                        <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">
                            Making equipment rental simple, accessible, and
                            convenient. Rent what you need, share what you own,
                            and connect with people around you.
                        </p>

                        
                    </div>


                    {/* Company */}
                    <div>

                        <h3 className="text-sm font-semibold text-white">
                            Company
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">

                            <Link
                                to="/about"
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                About Us
                            </Link>

                            <Link
                                to="/how-it-works"
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                How It Works
                            </Link>

                            <Link
                                to="/contact"
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                Contact
                            </Link>

                        </div>

                    </div>


                    {/* Resources */}
                    <div>

                        <h3 className="text-sm font-semibold text-white">
                            Resources
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">

                            <Link
                                to="/privacy"
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms"
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                Terms of Service
                            </Link>

                            <Link
                                to="/safety"
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                Safety & Trust
                            </Link>

                        </div>

                    </div>


                    {/* Trust Stats */}
                    <div className="flex flex-col gap-7">

                        <div>
                            <p className="text-xl font-semibold text-white">
                                100%
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Secure Platform
                            </p>
                        </div>


                        <div>
                            <p className="text-xl font-semibold text-white">
                                24/7
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Accessible
                            </p>
                        </div>


                        <div>
                            <p className="text-xl font-semibold text-white">
                                1
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Simple Platform
                            </p>
                        </div>


                    </div>

                </div>


                {/* Achievement / Trust Section */}
                <div className="mt-14 py-8 border-y border-white/10">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                        <div className="text-center md:text-left">

                            <p className="text-sm font-semibold text-white">
                                Built for a better way to rent
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Simple. Transparent. Community-driven.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div className="mt-7 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} RentVerse. All rights reserved.
                    </p>

                    <p className="text-xs text-gray-500">
                        Made with care for the rental community.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;