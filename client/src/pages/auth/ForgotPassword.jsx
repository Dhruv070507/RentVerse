import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/authSlice";

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

        await dispatch(
            forgotPassword(email.trim())
        );
    };

    return (
        <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-6 py-16">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-10">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b1b34] mb-4">
                        RentVerse
                    </p>

                    <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34] mb-4">
                        Forgot your password?
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        Enter your email address and we'll send you a
                        link to reset your password.
                    </p>

                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">

                    {/* Success Message */}
                    {forgotPasswordMessage && (
                        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                            {forgotPasswordMessage}
                        </div>
                    )}

                    {/* Error Message */}
                    {forgotPasswordError && (
                        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {forgotPasswordError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="mb-6">

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 outline-none transition focus:border-[#0b1b34] focus:ring-1 focus:ring-[#0b1b34]"
                            />

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={forgotPasswordLoading}
                            className="w-full bg-[#0b1b34] text-white py-3.5 rounded-lg font-medium transition hover:bg-[#13294b] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {forgotPasswordLoading
                                ? "Sending..."
                                : "Send Reset Link"}
                        </button>

                    </form>

                    {/* Back to Login */}
                    <div className="text-center mt-6">

                        <Link
                            to="/login"
                            className="text-sm font-medium text-[#0b1b34] hover:underline"
                        >
                            ← Back to Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;