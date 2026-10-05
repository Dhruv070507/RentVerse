import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/authSlice";

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
            setValidationError(
                "Invalid password reset link."
            );
            return;
        }

        if (password.length < 6) {
            setValidationError(
                "Password must be at least 6 characters long."
            );
            return;
        }

        if (password !== confirmPassword) {
            setValidationError(
                "Passwords do not match."
            );
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
        <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-6 py-16">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-10">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b1b34] mb-4">
                        RentVerse
                    </p>

                    <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34] mb-4">
                        Create a new password
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        Choose a new password for your RentVerse account.
                    </p>

                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">

                    {/* Success */}
                    {resetPasswordMessage && (
                        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                            {resetPasswordMessage}

                            <p className="mt-1 text-xs">
                                Redirecting you to login...
                            </p>
                        </div>
                    )}

                    {/* Backend Error */}
                    {resetPasswordError && (
                        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {resetPasswordError}
                        </div>
                    )}

                    {/* Validation Error */}
                    {validationError && (
                        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {validationError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* New Password */}
                        <div className="mb-5">

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                New password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                minLength={6}
                                autoComplete="new-password"
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 outline-none transition focus:border-[#0b1b34] focus:ring-1 focus:ring-[#0b1b34]"
                            />

                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">

                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                Confirm new password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                                minLength={6}
                                autoComplete="new-password"
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 outline-none transition focus:border-[#0b1b34] focus:ring-1 focus:ring-[#0b1b34]"
                            />

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={resetPasswordLoading || !!resetPasswordMessage}
                            className="w-full bg-[#0b1b34] text-white py-3.5 rounded-lg font-medium transition hover:bg-[#13294b] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {resetPasswordLoading
                                ? "Updating..."
                                : "Reset Password"}
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

export default ResetPassword;