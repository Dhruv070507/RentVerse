import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { notifications } = useSelector(
        (state) => state.notification
    );

    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <nav className="w-full bg-white border-b border-gray-200 font-sans">

            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[76px] flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 group"
                >

                    <div className="w-10 h-10 rounded-xl bg-[#0b1b34] flex items-center justify-center transition group-hover:bg-[#13294b]">

                        <span className="text-white font-display text-xl">
                            R
                        </span>

                    </div>

                    <span className="font-display text-2xl text-[#0b1b34] tracking-tight">
                        RentVerse
                    </span>

                </Link>


                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-9">

                    <Link
                        to="/"
                        className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        to="/My-payments"
                        className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors"
                    >
                        Payments
                    </Link>

                    <Link
                        to="/my-equipments"
                        className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors"
                    >
                        My Equipment
                    </Link>

                </div>


                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* Login */}
                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            className="
                                px-5 py-2.5
                                rounded-full
                                bg-[#0b1b34]
                                text-white
                                text-sm font-medium
                                hover:bg-[#13294b]
                                transition-colors
                            "
                        >
                            Login
                        </Link>
                    )}


                    {/* Notification */}
                    <Link
                        to="/notifications"
                        className="
                            relative
                            flex flex-col
                            items-center
                            justify-center
                            text-gray-600
                            hover:text-[#0b1b34]
                            transition-colors
                        "
                        aria-label="Notifications"
                    >

                        <div
                            className="
                                relative
                                w-11 h-10
                                flex items-center justify-center
                                rounded-xl
                                hover:bg-[#f2f5f8]
                                transition-colors
                            "
                        >

                            {/* Bell */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-[22px] h-[22px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 1-5.714 0A2.97 2.97 0 0 1 6.25 14.1V10a5.75 5.75 0 0 1 11.5 0v4.1a2.97 2.97 0 0 1-1.893 2.982ZM9.75 20h4.5"
                                />
                            </svg>


                            {/* Unread Badge */}
                            {unreadCount > 0 && (
                                <span
                                    className="
                                        absolute
                                        top-0
                                        right-0
                                        min-w-5
                                        h-5
                                        px-1
                                        rounded-full
                                        bg-[#0b1b34]
                                        text-white
                                        text-[10px]
                                        font-bold
                                        flex items-center justify-center
                                        border-2 border-white
                                    "
                                >
                                    {unreadCount > 9
                                        ? "9+"
                                        : unreadCount}
                                </span>
                            )}

                        </div>

                        <span className="text-[11px] font-medium text-gray-500">
                            Notifications
                        </span>

                    </Link>


                    {/* Logout */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="
                                px-5 py-2.5
                                rounded-full
                                bg-[#0b1b34]
                                text-white
                                text-sm font-medium
                                hover:bg-[#13294b]
                                transition-colors
                            "
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;