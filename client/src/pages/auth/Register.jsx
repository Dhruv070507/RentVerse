import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
    });

    const [profileImage, setProfileImage] = useState(null);

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
        setProfileImage(e.target.files[0]);
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
                "Registration successful"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-6 py-12">

            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="text-center mb-8">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b1b34] mb-4">
                        RentVerse
                    </p>

                    <h1 className="font-display text-4xl md:text-5xl text-[#0b1b34] mb-4">
                        Create your account
                    </h1>

                    <p className="text-gray-600">
                        Join RentVerse and start renting equipment.
                    </p>

                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">

                    {/* Success */}
                    {success && (
                        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                            {success}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Username */}
                        <div className="mb-5">

                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                minLength={3}
                                maxLength={30}
                                required
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 outline-none transition focus:border-[#0b1b34] focus:ring-1 focus:ring-[#0b1b34]"
                            />

                        </div>

                        {/* Email */}
                        <div className="mb-5">

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 outline-none transition focus:border-[#0b1b34] focus:ring-1 focus:ring-[#0b1b34]"
                            />

                        </div>

                        {/* Password */}
                        <div className="mb-5">

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                minLength={6}
                                required
                                autoComplete="new-password"
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 outline-none transition focus:border-[#0b1b34] focus:ring-1 focus:ring-[#0b1b34]"
                            />

                        </div>

                        {/* Address */}
                        <div className="mb-5">

                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                Address
                            </label>

                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                                rows="3"
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 outline-none transition resize-none focus:border-[#0b1b34] focus:ring-1 focus:ring-[#0b1b34]"
                            />

                        </div>

                        {/* Profile Image */}
                        <div className="mb-7">

                            <label
                                htmlFor="profileImage"
                                className="block text-sm font-medium text-[#0b1b34] mb-2"
                            >
                                Profile image
                                <span className="text-gray-400 font-normal">
                                    {" "}(optional)
                                </span>
                            </label>

                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#0b1b34] file:text-white file:font-medium hover:file:bg-[#13294b]"
                            />

                        </div>

                        {/* Register */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0b1b34] text-white py-3.5 rounded-lg font-medium transition hover:bg-[#13294b] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account"}
                        </button>

                    </form>

                    {/* Login */}
                    <div className="text-center mt-6">

                        <p className="text-sm text-gray-600">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-[#0b1b34] hover:underline"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;