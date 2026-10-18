import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { IconAlert, IconCheck } from "../../components/Icons.jsx";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(
            loginUser({
                email,
                password
            })
        );

        if (loginUser.fulfilled.match(result)) {
            const user = result.payload.user;

            if (user.role === "delivery_agent") {
                navigate("/agent/dashboard");
            } else if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                const destination =
                    location.state?.from?.pathname ||
                    (typeof location.state?.from === "string" ? location.state.from : null) ||
                    "/";
                navigate(destination);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Left Brand Panel */}
                    <div className="lg:col-span-5 bg-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
                        <div>
                            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full mb-4">
                                Welcome Back
                            </span>
                            <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
                                Access your rental hub.
                            </h1>
                            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Manage tool reservations, track equipment returns, and explore items listed nearby.
                            </p>
                        </div>

                        <div className="mt-10 pt-6 border-t border-slate-800 space-y-3">
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>Instant booking approvals</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>Verified delivery coordination</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>Protected payments via Razorpay</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Login Form */}
                    <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <h2 className="font-display font-extrabold text-2xl text-slate-900">
                                Sign in to RentVerse
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Enter your account credentials to continue
                            </p>
                        </div>

                        {location.state?.message && !error && (
                            <div className="mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center gap-2.5">
                                <IconAlert className="w-4 h-4 text-blue-600 shrink-0" />
                                <span>{location.state.message}</span>
                            </div>
                        )}

                        {error && (
                            <div className="mb-5 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2.5">
                                <IconAlert className="w-4 h-4 text-slate-500 shrink-0" />
                                <span>{error}</span>
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

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {loading ? "Signing in..." : "Sign In to RentVerse →"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-500">
                                Don't have an account yet?{" "}
                                <Link
                                    to="/register"
                                    className="font-bold text-slate-900 hover:text-blue-600 underline"
                                >
                                    Create an account
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

export default Login;