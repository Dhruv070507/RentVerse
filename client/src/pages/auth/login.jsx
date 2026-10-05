import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector(
        (state) => state.auth
    );

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

                navigate("/");
            }
        }
    };


    return (
        <div className="min-h-screen bg-white flex flex-col">

            <Navbar />


            <main className="flex-1">

                <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px]">


                        {/* =====================================================
                            LEFT — BRAND / INTRODUCTION
                        ===================================================== */}

                        <div className="bg-[#0b1b34] text-white px-8 py-12 md:px-14 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-between rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">

                            <div>

                                <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/50 mb-6">
                                    WELCOME BACK
                                </p>

                                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
                                    Welcome back
                                    <br />
                                    to RentVerse.
                                </h1>

                                <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed max-w-md mt-8">
                                    Continue managing your equipment,
                                    rentals and requests from one simple
                                    rental platform.
                                </p>

                            </div>


                            {/* Platform highlights */}

                            <div className="mt-16 space-y-8">

                                <div className="border-t border-white/10 pt-6">

                                    <p className="font-display text-2xl">
                                        Rent. Manage. Grow.
                                    </p>

                                    <p className="font-sans text-sm text-white/50 mt-2">
                                        Everything you need to manage
                                        equipment rentals in one place.
                                    </p>

                                </div>


                                <div className="grid grid-cols-2 gap-6">

                                    <div>

                                        <p className="font-display text-2xl">
                                            01
                                        </p>

                                        <p className="font-sans text-xs uppercase tracking-[0.15em] text-white/40 mt-2">
                                            Explore
                                        </p>

                                    </div>


                                    <div>

                                        <p className="font-display text-2xl">
                                            02
                                        </p>

                                        <p className="font-sans text-xs uppercase tracking-[0.15em] text-white/40 mt-2">
                                            Rent
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>



                        {/* =====================================================
                            RIGHT — LOGIN FORM
                        ===================================================== */}

                        <div className="border border-gray-100 border-t-0 lg:border-t lg:border-l-0 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none px-8 py-12 md:px-14 md:py-16 lg:px-16 lg:py-20 flex items-center">

                            <div className="w-full max-w-md mx-auto">


                                {/* Heading */}

                                <div className="mb-10">

                                    <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
                                        ACCOUNT LOGIN
                                    </p>

                                    <h2 className="font-display text-4xl md:text-5xl text-[#0b1b34] leading-tight">
                                        Sign in to continue.
                                    </h2>

                                    <p className="font-sans text-sm text-gray-500 mt-4 leading-relaxed">
                                        Access your rentals, equipment,
                                        requests and account activity.
                                    </p>

                                </div>



                                {/* Error */}

                                {error && (

                                    <div className="mb-6 border-l-2 border-red-500 bg-red-50 px-4 py-3">

                                        <p className="font-sans text-sm text-red-600">
                                            {error}
                                        </p>

                                    </div>

                                )}



                                {/* Login Form */}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-7"
                                >


                                    {/* Email */}

                                    <div>

                                        <label
                                            htmlFor="email"
                                            className="font-sans block text-xs uppercase tracking-[0.15em] text-gray-500 mb-3"
                                        >
                                            Email address
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="you@example.com"
                                            required
                                            className="
                                                font-sans
                                                w-full
                                                px-0
                                                py-4
                                                border-0
                                                border-b
                                                border-gray-200
                                                text-sm
                                                text-[#0b1b34]
                                                placeholder:text-gray-400
                                                outline-none
                                                focus:border-[#0b1b34]
                                                transition
                                            "
                                        />

                                    </div>



                                    {/* Password */}

                                    <div>

                                        <div className="flex items-center justify-between mb-3">

                                            <label
                                                htmlFor="password"
                                                className="font-sans text-xs uppercase tracking-[0.15em] text-gray-500"
                                            >
                                                Password
                                            </label>


                                            <div className="flex justify-end mt-2">
                                                <Link
                                                    to="/forgot-password"
                                                    className="text-sm text-[#0b1b34] hover:underline"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </div>

                                        </div>


                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter your password"
                                            required
                                            className="
                                                font-sans
                                                w-full
                                                px-0
                                                py-4
                                                border-0
                                                border-b
                                                border-gray-200
                                                text-sm
                                                text-[#0b1b34]
                                                placeholder:text-gray-400
                                                outline-none
                                                focus:border-[#0b1b34]
                                                transition
                                            "
                                        />

                                    </div>



                                    {/* Login Button */}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                                            w-full
                                            mt-3
                                            px-6
                                            py-4
                                            rounded-full
                                            bg-[#0b1b34]
                                            text-white
                                            font-sans
                                            text-sm
                                            font-medium
                                            hover:bg-[#142944]
                                            transition
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                        "
                                    >
                                        {loading
                                            ? "Logging in..."
                                            : "Login to RentVerse →"
                                        }
                                    </button>

                                </form>



                                {/* Register */}

                                <div className="mt-10 pt-8 border-t border-gray-100">

                                    <p className="font-sans text-sm text-gray-500">

                                        Don't have an account?{" "}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate("/register")
                                            }
                                            className="text-[#0b1b34] font-medium hover:underline"
                                        >
                                            Create an account
                                        </button>

                                    </p>

                                </div>



                                {/* Security */}

                                <div className="mt-8 flex items-center gap-3">

                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">

                                        <span className="text-xs text-[#0b1b34]">
                                            ✓
                                        </span>

                                    </div>

                                    <p className="font-sans text-xs text-gray-400">
                                        Secure access to your RentVerse account
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

export default Login;