import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 text-white pt-24 pb-20 md:pt-32 md:pb-24 border-b border-slate-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full mb-6">
                            Agreement & Terms
                        </span>
                        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
                            Terms of Service
                        </h1>
                        <p className="mt-4 text-xs sm:text-sm text-slate-400">
                            Effective as of October 2026 • Governing all users
                        </p>
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                            Please review these terms carefully before accessing or listing equipment on RentVerse.
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
                                    Platform Usage & Eligibility
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                RentVerse operates a peer-to-peer equipment rental ecosystem. By accessing our platform, you affirm that you are at least 18 years of age, legally capable of entering binding contracts, and that all information provided during registration is authentic and accurate.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
                                    02
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                    Equipment Owner Responsibilities
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Equipment owners represent and warrant that:
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc list-inside">
                                <li>They hold full legal ownership or authorization to lease the listed equipment.</li>
                                <li>Equipment is in safe, fully operational condition with all essential accessories provided.</li>
                                <li>Listed daily rental rates and item descriptions accurately reflect reality with no surprise surcharges.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
                                    03
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                    Renter Duties & Care of Gear
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Renters agree to operate machinery and tools solely in accordance with manufacturer safety guidelines. Renters are responsible for returning equipment on or before the agreed rental expiration date in the identical condition received, subject to reasonable wear and tear.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200">
                                    04
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                    Payments, Cancellations & Escrow
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                All rental payments are processed through Razorpay. Once an owner approves a booking, payment must be completed before a delivery agent is dispatched. Cancellations made prior to delivery dispatch may be eligible for a full or partial refund according to platform cancellation guidelines.
                            </p>
                        </div>

                        {/* Highlight Banner */}
                        <div className="rounded-2xl bg-slate-900 p-8 text-white border border-slate-800">
                            <h3 className="font-display font-bold text-xl text-white mb-2">
                                Fair Play & Community Accountability
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Violations of safety standards, intentional gear damage, harassment of delivery agents, or unauthorized sub-rentals will result in immediate permanent account termination and potential legal recourse.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfService;
