import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/authSlice";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconLock, IconAlert, IconCheck } from "../../components/Icons.jsx";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        resetPasswordLoading,
        resetPasswordError,
        resetPasswordMessage,
    } = useSelector((state) => state.auth);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationError, setValidationError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (!token) {
            setValidationError("Invalid or expired password reset link.");
            return;
        }

        if (password.length < 6) {
            setValidationError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setValidationError("Passwords do not match. Please verify.");
            return;
        }

        await dispatch(
            resetPassword({
                token,
                password,
            })
        );
    };

    useEffect(() => {
        if (resetPasswordMessage) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [resetPasswordMessage, navigate]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 relative overflow-hidden">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 border border-slate-200">
                            <IconLock className="w-6 h-6 text-slate-700" />
                        </div>

                        <div className="mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block mb-3 border border-slate-200">
                                Secure Update
                            </span>
                            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                Set new password
                            </h1>
                            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Enter your new password below to regain full access to your account.
                            </p>
                        </div>

                        {/* Success */}
                        {resetPasswordMessage && (
                            <div className="mb-5 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-start gap-2.5">
                                <IconCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold">Password updated successfully!</p>
                                    <p className="mt-0.5 text-blue-700 font-normal">
                                        {resetPasswordMessage} Redirecting to login in 2 seconds...
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Backend Error */}
                        {resetPasswordError && (
                            <div className="mb-5 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2.5">
                                <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                                <span>{resetPasswordError}</span>
                            </div>
                        )}

                        {/* Validation Error */}
                        {validationError && (
                            <div className="mb-5 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2.5">
                                <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                                <span>{validationError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                >
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    required
                                    minLength={6}
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition-all"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-type your password"
                                    required
                                    minLength={6}
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={resetPasswordLoading || !!resetPasswordMessage}
                                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {resetPasswordLoading ? "Updating Password..." : "Update Password →"}
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

export default ResetPassword;