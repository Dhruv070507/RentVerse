import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const { notifications = [] } = useSelector(
        (state) => state.notification || {}
    );

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: "/admin/dashboard", label: "Dashboard" },
        { path: "/admin/users", label: "Users" },
        { path: "/admin/categories", label: "Categories" },
        { path: "/admin/rentals", label: "Rentals" },
        { path: "/admin/deliveries", label: "Deliveries" },
        { path: "/admin/equipment", label: "Equipment" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass-header border-b border-slate-200/80 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Brand Logo & Admin Badge */}
                <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 group focus:outline-none"
                >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-slate-800 transition-all duration-200">
                        <span className="font-display font-bold text-xl tracking-wider">
                            R
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="font-display font-bold text-2xl text-slate-900 tracking-tight">
                            RentVerse
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 tracking-wide uppercase">
                            Admin
                        </span>
                    </div>
                </Link>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-xs">
                    {navLinks.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                                isActive(item.path)
                                    ? "bg-white text-[#0b1b34] shadow-xs"
                                    : "text-slate-600 hover:text-[#0b1b34] hover:bg-white/50"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Notification Link */}
                    <Link
                        to="/notifications"
                        className="relative p-2.5 rounded-full text-slate-600 hover:text-[#0b1b34] hover:bg-slate-100/80 transition-all focus:outline-none"
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
                            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 text-sm font-medium transition-all duration-200 cursor-pointer"
                    >
                        Logout
                    </button>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
                <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-5 py-4 space-y-1.5 shadow-xl">
                    {navLinks.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                isActive(item.path)
                                    ? "bg-[#0b1b34] text-white"
                                    : "text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        to="/notifications"
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </Link>
                </div>
            )}
        </header>
    );
};

export default AdminNavbar;