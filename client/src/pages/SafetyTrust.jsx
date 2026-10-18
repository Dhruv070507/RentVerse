import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";
import {
    IconShield,
    IconLock,
    IconCreditCard,
    IconStar,
    IconSearch,
    IconTool,
    IconClock
} from "../components/Icons.jsx";

const SafetyTrust = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 text-white pt-24 pb-20 md:pt-32 md:pb-24 border-b border-slate-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-6">
                            Trust & Security
                        </span>
                        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
                            Rent with complete confidence.
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                            RentVerse is engineered from the ground up to protect both equipment owners and renters through transparent policies, OTP verification, and secure escrow.
                        </p>
                    </div>
                </section>

                {/* 4 Pillars of Safety Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-3">
                            Our Protection Model
                        </span>
                        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                            Four layers of rental safety
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            How we maintain marketplace integrity for thousands of items
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 border border-slate-200">
                                <IconShield className="w-5 h-5 text-slate-700" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-slate-900">
                                Verified Listings
                            </h3>
                            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Owners provide detailed specifications and real condition photographs before tools can be booked.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 border border-slate-200">
                                <IconLock className="w-5 h-5 text-slate-700" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-slate-900">
                                OTP Handover
                            </h3>
                            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Delivery agents verify physical delivery and pickup using one-time passcodes provided by the customer.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 border border-slate-200">
                                <IconCreditCard className="w-5 h-5 text-slate-700" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-slate-900">
                                Protected Escrow
                            </h3>
                            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Funds are held securely through Razorpay until your rental request is approved and delivery is fulfilled.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 border border-slate-200">
                                <IconStar className="w-5 h-5 text-slate-700" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-slate-900">
                                Authenticated Reviews
                            </h3>
                            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Only genuine customers who completed a verified rental may leave star ratings and equipment feedback.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Best Practices Section */}
                <section className="bg-slate-50 py-20 border-t border-slate-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                                Community Guidelines
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Responsibilities shared by owners, renters, and delivery partners
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex gap-4 items-start">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                    <IconSearch className="w-4 h-4 text-slate-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Inspect on Delivery</h4>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        Check equipment condition and test basic functionality alongside the delivery agent before sharing your OTP.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex gap-4 items-start">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                    <IconTool className="w-4 h-4 text-slate-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Operate with Safety Gear</h4>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        Always wear proper protective equipment (gloves, eye protection, ear defenders) when using power or heavy machinery.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex gap-4 items-start">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                    <IconClock className="w-4 h-4 text-slate-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Respect Return Deadlines</h4>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        Return the gear on time so upcoming reservations and scheduled project dates for fellow community members are honored.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SafetyTrust;
