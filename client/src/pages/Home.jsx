import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";
import { IconClock, IconShield, IconUser } from "../components/Icons.jsx";

import { fetchCategories } from "../features/categorySlice";
import { getMyRentals, getRentalRequests } from "../features/rentalSlice";

const Home = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.auth);

    const { rentals = [], rentalRequests = [] } = useSelector(
        (state) => state.rental
    );

    const { categories = [], loading: categoryLoading } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        dispatch(fetchCategories());

        if (isAuthenticated) {
            dispatch(getMyRentals());
            dispatch(getRentalRequests());
        }
    }, [dispatch, isAuthenticated]);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-800 selection:text-white">
            <Navbar />

            {/* =====================================================
                HERO SECTION
            ===================================================== */}
            <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-slate-50/50 border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Eyebrow Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Equipment Rental Platform
                            </span>
                        </div>

                        {/* Hero Headline */}
                        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-slate-900">
                            Rent what you need.
                            <br />
                            <span className="text-blue-600">
                                Share what you own.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
                            RentVerse connects project creators, businesses, and equipment owners. Discover tools, request verified rentals, and manage payments safely in one place.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                            <Link
                                to="/equipments"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all duration-200"
                            >
                                Explore Marketplace
                            </Link>

                            {!isAuthenticated ? (
                                <Link
                                    to="/login"
                                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 shadow-xs transition-all duration-200"
                                >
                                    Get Started
                                </Link>
                            ) : (
                                <Link
                                    to="/add-equipment"
                                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 shadow-xs transition-all duration-200"
                                >
                                    + Add Equipment
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Value Metrics Grid */}
                    <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                        <div className="p-6 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                                <IconClock className="w-5 h-5 text-slate-700" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-slate-900">
                                Instant Request Flow
                            </h3>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                Rent equipment in clicks with transparent daily rates and automated scheduling.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                                <IconShield className="w-5 h-5 text-slate-700" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-slate-900">
                                Verified & Secured
                            </h3>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                Complete peace of mind with Razorpay escrow processing and OTP-protected drop-offs.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                                <IconUser className="w-5 h-5 text-slate-700" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-slate-900">
                                Community Driven
                            </h3>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                Put idle machinery and gear to work, earning income while helping nearby creators.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                CATEGORY EXPLORER SECTION
            ===================================================== */}
            <section className="bg-slate-900 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
                                Catalog Discovery
                            </div>
                            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                                Explore by Category
                            </h2>
                            <p className="mt-4 text-slate-400 text-base max-w-xl leading-relaxed">
                                Browse certified equipment across high-demand categories for residential, industrial, and creative use.
                            </p>
                        </div>

                        <Link
                            to="/equipments"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
                        >
                            <span>Browse full catalog</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    {categoryLoading ? (
                        <div className="py-16 text-center text-slate-400">
                            <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin mx-auto mb-3" />
                            Loading categories...
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="p-8 rounded-2xl bg-slate-800/60 border border-slate-800 text-center text-slate-400">
                            No categories available at the moment.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                                <Link
                                    key={category._id}
                                    to={`/equipments?category=${category._id}`}
                                    className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-800/70 border border-slate-700/60 hover:border-slate-500 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 text-sm font-bold">
                                            →
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-display text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                            {category.name}
                                        </h3>
                                        {category.description && (
                                            <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* =====================================================
                AUTHENTICATED ACTIVITY SECTION
            ===================================================== */}
            {isAuthenticated && (
                <section className="bg-slate-50/60 py-20 border-y border-slate-200/70">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                                Your Overview
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                                Active Rentals & Requests
                            </h2>
                        </div>

                        {/* Rentals List */}
                        <div className="mb-14">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-xl font-bold text-slate-800">
                                    Equipment you are renting
                                </h3>
                                <Link
                                    to="/my-rentals"
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    View all rentals →
                                </Link>
                            </div>

                            {(() => {
                                const actualRentals = rentals.filter(
                                    (rental) =>
                                        rental.status === "pending" ||
                                        rental.status === "approved" ||
                                        rental.status === "completed"
                                );

                                if (actualRentals.length === 0) {
                                    return (
                                        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 text-center text-slate-500 text-sm">
                                            You don't have any active rentals yet.{" "}
                                            <Link to="/equipments" className="text-blue-600 font-semibold underline">
                                                Discover equipment
                                            </Link>
                                        </div>
                                    );
                                }

                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {actualRentals.slice(0, 3).map((rental) => (
                                            <div
                                                key={rental._id}
                                                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                        Rental
                                                    </span>
                                                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize bg-slate-100 text-slate-700 border border-slate-200">
                                                        {rental.status}
                                                    </span>
                                                </div>

                                                <h4 className="font-display font-bold text-lg text-slate-900 line-clamp-1">
                                                    {rental.equipment?.name || "Equipment"}
                                                </h4>

                                                <p className="mt-2 text-xs text-slate-500">
                                                    {rental.rentalStartDate
                                                        ? new Date(rental.rentalStartDate).toLocaleDateString()
                                                        : "—"}{" "}
                                                    to{" "}
                                                    {rental.rentalEndDate
                                                        ? new Date(rental.rentalEndDate).toLocaleDateString()
                                                        : "—"}
                                                </p>

                                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">Total Price</span>
                                                    <span className="font-display font-bold text-lg text-slate-900">
                                                        ₹{rental.totalPrice}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Requests for your equipment */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-xl font-bold text-slate-800">
                                    Requests for your listed equipment
                                </h3>
                                <Link
                                    to="/rental-requests"
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    View all requests →
                                </Link>
                            </div>

                            {rentalRequests.length === 0 ? (
                                <div className="p-8 rounded-2xl bg-white border border-slate-200/80 text-center text-slate-500 text-sm">
                                    No incoming rental requests right now.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {rentalRequests.slice(0, 3).map((request) => (
                                        <div
                                            key={request._id}
                                            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                    Request
                                                </span>
                                                <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize bg-slate-100 text-slate-700 border border-slate-200">
                                                    {request.status}
                                                </span>
                                            </div>

                                            <h4 className="font-display font-bold text-lg text-slate-900 line-clamp-1">
                                                {request.equipment?.name || "Equipment"}
                                            </h4>

                                            <p className="mt-1 text-xs text-slate-500">
                                                By{" "}
                                                <span className="font-semibold text-slate-700">
                                                    @{request.renter?.username || "user"}
                                                </span>
                                            </p>

                                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-xs text-slate-500">Amount</span>
                                                <span className="font-display font-bold text-lg text-slate-900">
                                                    ₹{request.totalPrice}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                HOW IT WORKS
            ===================================================== */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-3">
                            Simple Process
                        </span>
                        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900">
                            How RentVerse Works
                        </h2>
                        <p className="mt-4 text-base text-slate-600 leading-relaxed">
                            Rent or lend equipment in four transparent, friction-free steps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                            <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-sm flex items-center justify-center border border-slate-200 mb-6">
                                01
                            </span>
                            <h3 className="font-display text-xl font-bold text-slate-900">
                                Discover Equipment
                            </h3>
                            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                                Filter by category, location, and daily rate. View real renter reviews and verified specifications.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                            <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-sm flex items-center justify-center border border-slate-200 mb-6">
                                02
                            </span>
                            <h3 className="font-display text-xl font-bold text-slate-900">
                                Reserve & Confirm
                            </h3>
                            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                                Select start and end dates. The equipment owner reviews and approves with full scheduling visibility.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                            <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-sm flex items-center justify-center border border-slate-200 mb-6">
                                03
                            </span>
                            <h3 className="font-display text-xl font-bold text-slate-900">
                                Secure Pay & Deliver
                            </h3>
                            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                                Complete checkout via Razorpay. Certified delivery agents safely transport the item with OTP validation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FINAL CALL TO ACTION
            ===================================================== */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-slate-900 p-10 md:p-14 text-center text-white relative overflow-hidden border border-slate-800 shadow-xl">
                        <div className="max-w-3xl mx-auto relative z-10">
                            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                                Ready to experience modern equipment sharing?
                            </h2>
                            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
                                Join renters and owners who make better use of idle resources every day.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                                <Link
                                    to="/equipments"
                                    className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 shadow-sm transition-all"
                                >
                                    Browse Marketplace
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-8 py-3.5 rounded-xl border border-slate-700 text-slate-200 font-semibold text-sm hover:bg-slate-800 transition-all"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
