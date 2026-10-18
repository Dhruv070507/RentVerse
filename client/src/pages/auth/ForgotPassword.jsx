import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/authSlice";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconLock, IconAlert, IconCheck } from "../../components/Icons.jsx";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const {
        forgotPasswordLoading,
        forgotPasswordError,
        forgotPasswordMessage,
    } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");

    useEffect(() => {
        setEmail("");
    }, [forgotPasswordMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        await dispatch(forgotPassword(email.trim()));
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
                <div className="w-full max-w-md">
                    {/* Header Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 relative overflow-hidden">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 border border-slate-200">
                            <IconLock className="w-6 h-6 text-slate-700" />
                        </div>

                        <div className="mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block mb-3 border border-slate-200">
                                Password Recovery
                            </span>
                            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                Forgot password?
                            </h1>
                            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Enter your registered email address and we'll send you an encrypted recovery link.
                            </p>
                        </div>

                        {/* Success Message */}
                        {forgotPasswordMessage && (
                            <div className="mb-5 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-start gap-2.5">
                                <IconCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold">Instructions sent!</p>
                                    <p className="mt-0.5 text-blue-700 font-normal">{forgotPasswordMessage}</p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {forgotPasswordError && (
                            <div className="mb-5 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2.5">
                                <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                                <span>{forgotPasswordError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                    autoComplete="email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition-all font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={forgotPasswordLoading}
                                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {forgotPasswordLoading ? "Sending Link..." : "Send Reset Link →"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                            >
                                <span>←</span> Return to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ForgotPassword;