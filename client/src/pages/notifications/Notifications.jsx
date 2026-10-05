import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
} from "../../features/notificationSlice";

import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";


const notificationConfig = {
    rental_request: {
        title: "Rental Request",
        icon: "📦"
    },
    rental_approved: {
        title: "Rental Approved",
        icon: "✓"
    },
    rental_rejected: {
        title: "Rental Rejected",
        icon: "!"
    },
    rental_cancelled: {
        title: "Rental Cancelled",
        icon: "×"
    },
    payment_completed: {
        title: "Payment Completed",
        icon: "₹"
    },
    payment_failed: {
        title: "Payment Failed",
        icon: "!"
    },
    rental_completed: {
        title: "Rental Completed",
        icon: "✓"
    },
    delivery_otp: {
        title: "Delivery OTP",
        icon: "🔐"
    },
    return_otp: {
        title: "Return OTP",
        icon: "🔑"
    }
};


const getTimeAgo = (date) => {

    const seconds = Math.floor(
        (new Date() - new Date(date)) / 1000
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return `${days}d ago`;
    }

    return new Date(date).toLocaleDateString();
};


const Notifications = () => {

    const dispatch = useDispatch();

    const {
        notifications,
        loading,
        error
    } = useSelector((state) => state.notification);


    useEffect(() => {
        dispatch(getMyNotifications());
    }, [dispatch]);


    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;


    const handleNotificationClick = (notification) => {

        if (!notification.isRead) {
            dispatch(
                markNotificationAsRead(notification._id)
            );
        }

    };


    const handleMarkAllAsRead = () => {

        if (unreadCount > 0) {
            dispatch(markAllNotificationsAsRead());
        }

    };


    return (
        <div className="min-h-screen bg-white">

            <Navbar />


            <main className="pt-32 pb-24">


                {/* =====================================================
                    PAGE INTRO
                ===================================================== */}

                <section className="max-w-7xl mx-auto px-6">

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                        <div className="max-w-3xl">

                            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-5">
                                ACTIVITY
                            </p>

                            <h1 className="font-display text-5xl md:text-6xl leading-tight text-[#0b1b34]">
                                Notifications.
                            </h1>

                            <p className="font-sans text-base md:text-lg text-gray-500 mt-6 leading-relaxed max-w-2xl">
                                Stay up to date with your rentals, payments,
                                deliveries, and other important activity.
                            </p>

                        </div>


                        {/* Unread information */}

                        <div className="lg:text-right">

                            <p className="font-sans text-sm text-gray-400">
                                {unreadCount > 0
                                    ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                                    : "You're all caught up"
                                }
                            </p>


                            {unreadCount > 0 && (

                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="
                                        mt-3
                                        font-sans
                                        text-sm
                                        font-medium
                                        text-[#0b1b34]
                                        hover:underline
                                        transition
                                    "
                                >
                                    Mark all as read →
                                </button>

                            )}

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    NOTIFICATION LIST
                ===================================================== */}

                <section className="max-w-7xl mx-auto px-6 mt-20">

                    <div className="border-t border-gray-200">


                        {/* Loading */}

                        {loading && (

                            <div className="py-16">

                                <p className="font-sans text-sm text-gray-400">
                                    Loading notifications...
                                </p>

                            </div>

                        )}


                        {/* Error */}

                        {error && !loading && (

                            <div className="py-16">

                                <p className="font-sans text-sm text-red-500">
                                    {error}
                                </p>

                            </div>

                        )}


                        {/* Empty */}

                        {!loading &&
                            !error &&
                            notifications.length === 0 && (

                                <div className="py-20">

                                    <div className="max-w-xl">

                                        <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase">
                                            NO ACTIVITY
                                        </p>

                                        <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34] mt-4">
                                            You're all caught up.
                                        </h2>

                                        <p className="font-sans text-gray-500 mt-4 leading-relaxed">
                                            New rental, payment, delivery,
                                            and account updates will appear
                                            here.
                                        </p>

                                    </div>

                                </div>

                            )}


                        {/* Notifications */}

                        {!loading &&
                            notifications.length > 0 && (

                                <div>

                                    {notifications.map((notification) => {

                                        const config =
                                            notificationConfig[
                                                notification.type
                                            ] || {
                                                title: "Notification",
                                                icon: "•"
                                            };


                                        return (

                                            <button
                                                key={notification._id}
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        notification
                                                    )
                                                }
                                                className={`
                                                    w-full
                                                    text-left
                                                    border-b
                                                    border-gray-100
                                                    py-7
                                                    transition
                                                    ${
                                                        notification.isRead
                                                            ? "bg-white hover:bg-gray-50"
                                                            : "bg-gray-50/60 hover:bg-gray-100"
                                                    }
                                                `}
                                            >

                                                <div className="grid grid-cols-1 md:grid-cols-[56px_1fr_auto] gap-5 md:gap-7 items-start">


                                                    {/* Icon */}

                                                    <div
                                                        className={`
                                                            w-12
                                                            h-12
                                                            rounded-full
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-sm
                                                            font-semibold
                                                            ${
                                                                notification.isRead
                                                                    ? "bg-gray-100 text-gray-500"
                                                                    : "bg-[#0b1b34] text-white"
                                                            }
                                                        `}
                                                    >
                                                        {config.icon}
                                                    </div>


                                                    {/* Content */}

                                                    <div className="min-w-0">

                                                        <div className="flex items-center gap-3">

                                                            <p className="font-sans text-xs tracking-[0.15em] uppercase text-gray-400">
                                                                {config.title}
                                                            </p>


                                                            {!notification.isRead && (

                                                                <span className="w-2 h-2 rounded-full bg-[#0b1b34]" />

                                                            )}

                                                        </div>


                                                        <p
                                                            className={`
                                                                font-sans
                                                                text-base
                                                                mt-2
                                                                leading-relaxed
                                                                ${
                                                                    notification.isRead
                                                                        ? "text-gray-500"
                                                                        : "text-[#0b1b34] font-medium"
                                                                }
                                                            `}
                                                        >
                                                            {notification.message}
                                                        </p>

                                                    </div>


                                                    {/* Time */}

                                                    <div className="md:text-right">

                                                        <span className="font-sans text-xs text-gray-400 whitespace-nowrap">
                                                            {getTimeAgo(
                                                                notification.createdAt
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>

                                            </button>

                                        );

                                    })}

                                </div>

                            )}

                    </div>

                </section>


                {/* =====================================================
                    SUPPORTING SECTION
                ===================================================== */}

                <section className="max-w-7xl mx-auto px-6 mt-24">

                    <div className="bg-[#0b1b34] rounded-3xl px-8 py-12 md:px-12 md:py-16">

                        <div className="max-w-2xl">

                            <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
                                STAY INFORMED
                            </p>

                            <h2 className="font-display text-3xl md:text-4xl text-white">
                                Everything important,
                                <br />
                                in one place.
                            </h2>

                            <p className="font-sans text-white/60 mt-5 leading-relaxed max-w-xl">
                                RentVerse keeps you informed throughout the
                                rental process, from the moment a request is
                                created until equipment is returned.
                            </p>

                        </div>

                    </div>

                </section>

            </main>


            <Footer />

        </div>
    );
};


export default Notifications;