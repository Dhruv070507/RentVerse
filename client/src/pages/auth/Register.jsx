import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconAlert, IconCheck } from "../../components/Icons.jsx";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("address", formData.address);

            if (profileImage) {
                data.append("profileImage", profileImage);
            }

            const response = await api.post(
                "/users/register",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSuccess(
                response.data.message ||
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please check your details and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
                    {/* Left Brand Panel */}
                    <div className="lg:col-span-5 bg-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
                        <div>
                            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full mb-4">
                                Join RentVerse
                            </span>
                            <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
                                Start renting equipment today.
                            </h1>
                            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Create an account to borrow high-grade tools, list your own equipment, and enjoy secure transactions.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>No subscription fees to join</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>Direct door-to-door delivery coordination</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>Secure escrow payments with Razorpay</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>Verified renter & owner community</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Register Form */}
                    <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
                        <div className="mb-6">
                            <h2 className="font-display font-extrabold text-2xl text-slate-900">
                                Create your account
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Complete the form below to get started in seconds
                            </p>
                        </div>

                        {/* Success */}
                        {success && (
                            <div className="mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center gap-2.5">
                                <IconCheck className="w-4 h-4 text-blue-600 shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="mb-5 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2.5">
                                <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Username & Email in responsive grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="johndoe"
                                        minLength={3}
                                        maxLength={30}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        required
                                        autoComplete="email"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                    minLength={6}
                                    required
                                    autoComplete="new-password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                >
                                    Delivery Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street, locality, city, pincode"
                                    rows="2"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none font-medium"
                                />
                            </div>

                            {/* Profile Image */}
                            <div>
                                <label
                                    htmlFor="profileImage"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                                >
                                    Profile Picture <span className="text-slate-400 lowercase font-normal">(optional)</span>
                                </label>
                                <div className="flex items-center gap-4">
                                    {previewUrl && (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                                        />
                                    )}
                                    <input
                                        id="profileImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-slate-100 file:text-slate-700 file:font-semibold hover:file:bg-slate-200 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-3 py-3.5 px-6 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {loading ? "Creating your account..." : "Complete Registration →"}
                            </button>
                        </form>

                        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-500">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-bold text-[#0b1b34] hover:text-blue-600 underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Register;