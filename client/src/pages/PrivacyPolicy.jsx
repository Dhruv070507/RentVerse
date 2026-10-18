import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 text-white pt-24 pb-20 md:pt-32 md:pb-24 border-b border-slate-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-6">
                            Legal & Compliance
                        </span>
                        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-xs sm:text-sm text-slate-400">
                            Last Updated: October 2026 • Effective Worldwide
                        </p>
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                            RentVerse is committed to safeguarding your personal data, transaction history, and privacy across our marketplace.
                        </p>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                    <div className="space-y-8">
                        {/* Section 1 */}
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
                                    01
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                    Information We Collect
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                When you create an account, list tools, or rent equipment on RentVerse, we collect the necessary details to deliver secure services:
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc list-inside">
                                <li><strong>Identity & Account Data:</strong> Username, email address, password hash, and optional profile image.</li>
                                <li><strong>Delivery & Location:</strong> Physical address coordinates for doorstep dispatch and equipment return coordination.</li>
                                <li><strong>Transaction History:</strong> Rental periods, equipment rental fees, Razorpay payment reference IDs (we do not store raw card numbers or CVVs).</li>
                                <li><strong>Listing Content:</strong> Equipment titles, descriptions, categories, specifications, pricing, and uploaded equipment photographs.</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
                                    02
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                    How We Use Your Information
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Your information is exclusively utilized to power marketplace operations:
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc list-inside">
                                <li>Facilitating rental requests and instant notifications between owners and renters.</li>
                                <li>Assigning delivery agents to fulfill pickups, delivery runs, and OTP handoffs.</li>
                                <li>Processing payments safely via authorized gateway providers like Razorpay.</li>
                                <li>Preventing fraudulent behavior, unauthorized access, and bad-faith equipment cancellations.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
                                    03
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                    Security & Data Protection
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                We employ industry-standard encryption protocols (HTTPS/TLS) across all client-server communications. Passwords are securely hashed with bcrypt algorithms, and authentication sessions are guarded with signed JSON Web Tokens (JWT). Access to administrative dashboards is strictly restricted through role-based access control.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
                                    04
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                    Your Privacy Rights
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                You hold complete sovereignty over your RentVerse profile. You may modify your personal details, update your delivery address, reset your password, or request complete account deletion by contacting our privacy compliance desk at <strong>privacy@rentverse.com</strong>.
                            </p>
                        </div>

                        {/* Highlight Banner */}
                        <div className="rounded-2xl bg-slate-900 p-8 text-white border border-slate-800">
                            <h3 className="font-display font-bold text-xl text-white mb-2">
                                Transparency is non-negotiable.
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                We never sell, lease, or distribute your personal contact information to third-party advertisers. All collected details exist purely to connect owners and renters securely.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
