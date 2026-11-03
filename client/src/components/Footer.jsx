
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-50 w-full border-t border-black/15 bg-[#F5F4F2] font-sans text-black">
            {/* Main Footer */}
            <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-16">

                {/* Brand and Introduction */}
                <div className="grid gap-7 border-b border-black/20 pb-8 sm:gap-10 sm:pb-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">

                    <div>
                        <Link to="/" className="inline-block">
                            <span className="font-serif text-3xl leading-none tracking-[-0.06em] sm:text-4xl">
                                RentVerse
                            </span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-black/65">
                            A better way to access the equipment you need.
                            Discover, rent and share useful equipment while
                            making more of what you already own.
                        </p>
                    </div>

                    <div className="flex flex-col justify-end lg:items-end">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/50">
                            Find it. Rent it. Get to work.
                        </p>

                        <Link
                            to="/equipments"
                            className="group mt-3 inline-flex items-center gap-4 border-b border-black pb-2 text-sm font-medium transition-opacity hover:opacity-60"
                        >
                            Explore equipment
                            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-8 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4 lg:gap-10 lg:py-10">

                    {/* Company */}
                    <div>
                        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                            Company
                        </h3>

                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/about" className="transition-opacity hover:opacity-50">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" className="transition-opacity hover:opacity-50">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="transition-opacity hover:opacity-50">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                            Explore
                        </h3>

                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/equipments" className="transition-opacity hover:opacity-50">
                                    All Equipment
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-equipment" className="transition-opacity hover:opacity-50">
                                    Add Equipment
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                            Resources
                        </h3>

                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/safety-trust" className="transition-opacity hover:opacity-50">
                                    Safety & Trust
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="transition-opacity hover:opacity-50">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="transition-opacity hover:opacity-50">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                            Platform
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">
                                    Secure Payments
                                </p>
                                <p className="mt-1 text-xs leading-5 text-black/55">
                                    Payments powered by Razorpay.
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    Verified Handoffs
                                </p>
                                <p className="mt-1 text-xs leading-5 text-black/55">
                                    OTP-based delivery and return tracking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="flex flex-col justify-between gap-3 border-t border-black/20 pt-5 sm:flex-row sm:items-center">
                    <p className="font-serif text-lg italic text-black/75 sm:text-xl">
                        Make more of what you own.
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.15em] text-black/50">
                        Built for better access to equipment.
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black px-5 py-4 text-white sm:px-8 lg:px-16">
                <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-[11px] tracking-wide text-white/65">
                        © {new Date().getFullYear()} RentVerse. All rights reserved.
                    </p>

                    <Link
                        to="/"
                        className="text-[11px] uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-white"
                    >
                        Back to top ↑
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
