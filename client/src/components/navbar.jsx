import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const { notifications = [] } = useSelector(
        (state) => state.notification || {}
    );

    const { isAuthenticated, user } = useSelector(
        (state) => state.auth || {}
    );

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.toLowerCase().startsWith(path.toLowerCase())) return true;
        return false;
    };

    return (
        <header className="sticky top-0 z-50 w-full glass-header border-b border-slate-200/80 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 group focus:outline-none"
                >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-slate-800 transition-all duration-200">
                        <span className="font-display font-bold text-xl tracking-wider">
                            R
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-display font-bold text-2xl text-slate-900 tracking-tight transition-colors">
                            RentVerse
                        </span>
                        <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-500 hidden sm:block -mt-1">
                            Equipment Sharing
                        </span>
                    </div>
                </Link>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-xs">
                    <Link
                        to="/"
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            isActive("/")
                                ? "bg-white text-[#0b1b34] shadow-xs font-semibold"
                                : "text-slate-600 hover:text-[#0b1b34] hover:bg-white/50"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/equipments"
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            isActive("/equipments")
                                ? "bg-white text-[#0b1b34] shadow-xs font-semibold"
                                : "text-slate-600 hover:text-[#0b1b34] hover:bg-white/50"
                        }`}
                    >
                        Explore
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link
                                to="/my-equipments"
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    isActive("/my-equipments")
                                        ? "bg-white text-[#0b1b34] shadow-xs font-semibold"
                                        : "text-slate-600 hover:text-[#0b1b34] hover:bg-white/50"
                                }`}
                            >
                                My Equipment
                            </Link>

                            <Link
                                to="/my-rentals"
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    isActive("/my-rentals")
                                        ? "bg-white text-[#0b1b34] shadow-xs font-semibold"
                                        : "text-slate-600 hover:text-[#0b1b34] hover:bg-white/50"
                                }`}
                            >
                                My Rentals
                            </Link>

                            <Link
                                to="/My-payments"
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    isActive("/My-payments")
                                        ? "bg-white text-[#0b1b34] shadow-xs font-semibold"
                                        : "text-slate-600 hover:text-[#0b1b34] hover:bg-white/50"
                                }`}
                            >
                                Payments
                            </Link>
                        </>
                    )}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Notification Link */}
                    {isAuthenticated && (
                        <Link
                            to="/notifications"
                            className="relative p-2.5 rounded-full text-slate-600 hover:text-[#0b1b34] hover:bg-slate-100/80 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            aria-label="Notifications"
                            title="Notifications"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 1-5.714 0A2.97 2.97 0 0 1 6.25 14.1V10a5.75 5.75 0 0 1 11.5 0v4.1a2.97 2.97 0 0 1-1.893 2.982ZM9.75 20h4.5"
                                />
                            </svg>

                            {unreadCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                                    {unreadCount > 9 ? "9+" : unreadCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Auth Actions */}
                    {!isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-5 py-2.5 rounded-full bg-[#0b1b34] text-white text-sm font-semibold hover:bg-[#152a4e] shadow-sm hover:shadow transition-all duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="hidden sm:inline-flex px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-all duration-200"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            {user?.username && (
                                <span className="hidden lg:inline-flex text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60">
                                    @{user.username}
                                </span>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 text-sm font-medium transition-all duration-200 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-5 py-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
                    <Link
                        to="/"
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isActive("/") ? "bg-[#0b1b34] text-white" : "text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/equipments"
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isActive("/equipments") ? "bg-[#0b1b34] text-white" : "text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                        Explore Equipment
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link
                                to="/my-equipments"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive("/my-equipments") ? "bg-[#0b1b34] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                My Equipment
                            </Link>

                            <Link
                                to="/my-rentals"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive("/my-rentals") ? "bg-[#0b1b34] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                My Rentals
                            </Link>

                            <Link
                                to="/My-payments"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive("/My-payments") ? "bg-[#0b1b34] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                Payments
                            </Link>

                            <Link
                                to="/notifications"
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
                            >
                                Notifications {unreadCount > 0 && `(${unreadCount})`}
                            </Link>
                        </>
                    )}

                    {!isAuthenticated && (
                        <div className="pt-2 flex flex-col gap-2">
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="w-full text-center py-2.5 rounded-xl bg-[#0b1b34] text-white text-sm font-semibold"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMobileOpen(false)}
                                className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;