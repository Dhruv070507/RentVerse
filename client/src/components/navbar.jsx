
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const { notifications = [] } = useSelector(
        (state) => state.notification || {}
    );

    const { categories = [] } = useSelector(
        (state) => state.category || {}
    );

    const { isAuthenticated, user } = useSelector(
        (state) => state.auth || {}
    );

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const handleLogout = async () => {
        await dispatch(logoutUser());
        setMobileOpen(false);
        navigate("/login");
    };

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.toLowerCase().startsWith(path.toLowerCase());
    };

    const navLinkClass = (path) =>
        `relative py-2 text-[13px] font-semibold transition-colors duration-200 ${
            isActive(path)
                ? "text-black"
                : "text-black/60 hover:text-black"
        }`;

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setSearchOpen(false);
    };

    const handleCategorySelect = (categoryId) => {
        navigate(
            categoryId
                ? `/equipments?category=${encodeURIComponent(categoryId)}`
                : "/equipments"
        );

        setSearchOpen(false);
        setMobileOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#F5F4F2]/95 backdrop-blur-md">
            <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-16">

                {/* BRAND */}
                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center"
                >
                    <span className="rentverse-hero-title font-serif text-[clamp(1.6rem,2.2vw,2.2rem)] leading-[0.91] tracking-[-0.055em]">
    RentVerse
</span>
                    <span className="ml-1.5 mt-[-15px] text-[10px] text-black/60">
                        ®
                    </span>
                </Link>

                {/* MAIN NAVIGATION - SAME FOR EVERYONE */}
                <nav className="hidden items-center gap-9 lg:flex">

                    <Link
                        to="/"
                        className={navLinkClass("/")}
                    >
                        Home
                        {isActive("/") && (
                            <span className="absolute -bottom-[7px] left-0 h-px w-full bg-black" />
                        )}
                    </Link>
                    <Link
                        to="/equipments"
                        className={navLinkClass("/equipments")}
                    >
                        Explore
                        {isActive("/equipments") && (
                            <span className="absolute -bottom-[7px] left-0 h-px w-full bg-black" />
                        )}
                    </Link>

                    <Link
                        to="/about"
                        className={navLinkClass("/about")}
                    >
                        About Us
                        {isActive("/about") && (
                            <span className="absolute -bottom-[7px] left-0 h-px w-full bg-black" />
                        )}
                    </Link>

                    {/* CATEGORY SEARCH */}
                    <div className="relative">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Search by category"
                            aria-expanded={searchOpen}
                            className="flex h-9 w-9 items-center justify-center text-black/70 transition-colors hover:text-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-[21px] w-[21px]"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path
                                    strokeLinecap="round"
                                    d="m16 16 4 4"
                                />
                            </svg>
                        </button>

                        {searchOpen && (
                            <div className="absolute right-0 top-12 z-50 w-64 border border-black/10 bg-[#F5F4F2] py-2 shadow-lg">
                                <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-black/45">
                                    Browse by category
                                </p>

                                <button
                                    onClick={() => handleCategorySelect("")}
                                    className="w-full px-4 py-2.5 text-left text-sm font-semibold text-black/75 transition-colors hover:bg-black/5 hover:text-black"
                                >
                                    All Equipment
                                </button>

                                {categories.map((category) => (
                                    <button
                                        key={category._id}
                                        onClick={() =>
                                            handleCategorySelect(category._id)
                                        }
                                        className="w-full px-4 py-2.5 text-left text-sm font-semibold text-black/75 transition-colors hover:bg-black/5 hover:text-black"
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* ACCOUNT ACTIONS */}
                <div className="hidden items-center gap-5 lg:flex">

                    {isAuthenticated ? (
                        <>
                            {user?.username && (
                                <span className="max-w-[130px] truncate text-xs font-semibold text-black/75">
                                    @{user.username}
                                </span>
                            )}

                            <Link
                                to="/notifications"
                                aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                                className="relative flex h-9 w-9 items-center justify-center text-black/70 transition-colors hover:text-black"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.7}
                                    stroke="currentColor"
                                    className="h-[21px] w-[21px]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 1-5.714 0A2.97 2.97 0 0 1 6.25 14.1V10a5.75 5.75 0 0 1 11.5 0v4.1a2.97 2.97 0 0 1-1.893 2.982ZM9.75 20h4.5"
                                    />
                                </svg>

                                {unreadCount > 0 && (
                                    <span className="absolute right-0 top-0 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </span>
                                )}
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="border border-black/25 px-5 py-2.5 text-[12px] font-semibold text-black transition-colors duration-200 hover:border-black hover:bg-black hover:text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-[13px] font-semibold text-black/65 transition-colors hover:text-black"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-black px-6 py-3 text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-black/75"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex h-10 w-10 items-center justify-center text-black lg:hidden"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 8h18M3 16h18" />
                        </svg>
                    )}
                </button>
            </div>

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className="border-t border-black/10 bg-[#F5F4F2] px-5 pb-7 pt-5 lg:hidden">
                    <nav className="flex flex-col" aria-label="Mobile navigation">

                        <Link
                            to="/equipments"
                            onClick={closeMobileMenu}
                            className="border-b border-black/10 py-4 font-serif text-2xl font-bold text-black"
                        >
                            Explore
                        </Link>

                        <Link
                            to="/about"
                            onClick={closeMobileMenu}
                            className="border-b border-black/10 py-4 font-serif text-2xl font-bold text-black"
                        >
                            About Us
                        </Link>

                        {/* MOBILE CATEGORY SEARCH */}
                        <div className="border-b border-black/10 py-4">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="flex w-full items-center justify-between font-serif text-2xl font-bold text-black"
                            >
                                Search
                                <svg
                                    className={`h-5 w-5 transition-transform ${searchOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {searchOpen && (
                                <div className="mt-4 flex flex-col">
                                    <button
                                        onClick={() => handleCategorySelect("")}
                                        className="py-2 text-left text-sm font-semibold text-black/70"
                                    >
                                        All Equipment
                                    </button>

                                    {categories.map((category) => (
                                        <button
                                            key={category._id}
                                            onClick={() =>
                                                handleCategorySelect(category._id)
                                            }
                                            className="py-2 text-left text-sm font-semibold text-black/70"
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* AUTHENTICATED MOBILE ACTIONS */}
                        {isAuthenticated ? (
                            <>
                                {user?.username && (
                                    <p className="py-4 text-sm font-semibold text-black/65">
                                        @{user.username}
                                    </p>
                                )}

                                <Link
                                    to="/notifications"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-between border-b border-black/10 py-4 text-sm font-semibold text-black"
                                >
                                    Notifications
                                    {unreadCount > 0 && (
                                        <span className="text-xs text-black/55">
                                            {unreadCount} unread
                                        </span>
                                    )}
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="mt-5 min-h-12 w-full border border-black/25 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="flex min-h-12 items-center justify-center border border-black/30 text-sm font-semibold text-black"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMobileMenu}
                                    className="flex min-h-12 items-center justify-center bg-black text-sm font-semibold text-white"
                                >
                                    Get started
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
