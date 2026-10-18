import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-20 w-full bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-5">
                        <Link to="/" className="flex items-center gap-3 group w-fit">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                R
                            </div>
                            <span className="font-display font-bold text-2xl text-white tracking-tight">
                                RentVerse
                            </span>
                        </Link>

                        <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                            Next-generation equipment sharing ecosystem. Rent heavy machinery, power tools, electronics, or outdoor gear safely and efficiently.
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                All Systems Operational
                            </span>
                        </div>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Company
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-slate-400 hover:text-white transition-colors duration-200"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/how-it-works"
                                    className="text-slate-400 hover:text-white transition-colors duration-200"
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-slate-400 hover:text-white transition-colors duration-200"
                                >
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Resources
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link
                                    to="/safety-trust"
                                    className="text-slate-400 hover:text-white transition-colors duration-200"
                                >
                                    Safety & Trust
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms-of-service"
                                    className="text-slate-400 hover:text-white transition-colors duration-200"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="text-slate-400 hover:text-white transition-colors duration-200"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Trust Highlights */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Verified Standard
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                                <p className="text-xs font-semibold text-white">100% Secure Payments</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">Automated Razorpay verification</p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                                <p className="text-xs font-semibold text-white">OTP Authenticated</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">Secure drop-off & return validation</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} RentVerse Inc. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        <span>Crafted for high performance & reliability</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;