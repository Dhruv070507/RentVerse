import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/Footer.jsx";
import { IconClose } from "../../components/Icons.jsx";

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 sm:py-28">
                <div className="max-w-xl w-full bg-white rounded-2xl p-8 sm:p-14 border border-slate-200 shadow-sm text-center">
                    {/* Error Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-6 text-slate-800">
                        <IconClose className="w-8 h-8" />
                    </div>

                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3">
                        Transaction Incomplete
                    </span>

                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                        Payment Didn't Go Through
                    </h1>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                        Your account has not been charged. The transaction was cancelled or declined by your bank. You can retry anytime from your bookings.
                    </p>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={() => navigate("/my-rentals")}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                        >
                            Return to My Rentals
                        </button>
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentFailed;