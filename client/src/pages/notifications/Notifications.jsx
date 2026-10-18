import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
} from "../../features/notificationSlice";

import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";
import {
    IconPackage,
    IconCheck,
    IconClose,
    IconAlert,
    IconCreditCard,
    IconLock,
    IconBell
} from "../../components/Icons.jsx";

const notificationConfig = {
    rental_request: {
        title: "Rental Request",
        icon: <IconPackage className="w-4 h-4 text-slate-700" />,
        badge: "bg-slate-100 text-slate-700 border-slate-200"
    },
    rental_approved: {
        title: "Rental Approved",
        icon: <IconCheck className="w-4 h-4 text-blue-700" />,
        badge: "bg-blue-50 text-blue-700 border-blue-200"
    },
    rental_rejected: {
        title: "Rental Rejected",
        icon: <IconClose className="w-4 h-4 text-slate-700" />,
        badge: "bg-slate-100 text-slate-700 border-slate-200"
    },
    rental_cancelled: {
        title: "Rental Cancelled",
        icon: <IconClose className="w-4 h-4 text-slate-700" />,
        badge: "bg-slate-100 text-slate-700 border-slate-200"
    },
    payment_completed: {
        title: "Payment Confirmed",
        icon: <IconCreditCard className="w-4 h-4 text-blue-700" />,
        badge: "bg-blue-50 text-blue-700 border-blue-200"
    },
    payment_failed: {
        title: "Payment Failed",
        icon: <IconAlert className="w-4 h-4 text-slate-700" />,
        badge: "bg-slate-100 text-slate-700 border-slate-200"
    },
    rental_completed: {
        title: "Rental Completed",
        icon: <IconCheck className="w-4 h-4 text-blue-700" />,
        badge: "bg-blue-50 text-blue-700 border-blue-200"
    },
    delivery_otp: {
        title: "Delivery OTP",
        icon: <IconLock className="w-4 h-4 text-slate-700" />,
        badge: "bg-slate-100 text-slate-700 border-slate-200"
    },
    return_otp: {
        title: "Return OTP",
        icon: <IconLock className="w-4 h-4 text-slate-700" />,
        badge: "bg-slate-100 text-slate-700 border-slate-200"
    }
};

const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric"
    });
};

const Notifications = () => {
    const dispatch = useDispatch();

    const {
        notifications = [],
        loading,
        error
    } = useSelector((state) => state.notification || {});

    useEffect(() => {
        dispatch(getMyNotifications());
    }, [dispatch]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            dispatch(markNotificationAsRead(notification._id));
        }
    };

    const handleMarkAllAsRead = () => {
        if (unreadCount > 0) {
            dispatch(markAllNotificationsAsRead());
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            {/* Header Banner */}
            <section className="bg-slate-900 border-b border-slate-800 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full mb-3">
                            Activity Center
                        </span>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white">
                            Notifications
                        </h1>
                        <p className="mt-2 text-slate-400 text-sm max-w-md">
                            Stay up to date with rental approvals, dispatch alerts, payment confirmations, and secure OTPs.
                        </p>
                    </div>

                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 shadow-sm transition-all w-fit cursor-pointer"
                        >
                            Mark All as Read ({unreadCount})
                        </button>
                    )}
                </div>
            </section>

            {/* Notification Stream */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pb-24">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Activity Stream
                        </span>
                        <span className="text-xs text-slate-400">
                            {unreadCount} unread of {notifications.length} total
                        </span>
                    </div>

                    {loading && (
                        <div className="p-12 text-center text-slate-400 text-sm">
                            <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
                            Loading notifications...
                        </div>
                    )}

                    {error && !loading && (
                        <div className="p-6 text-center text-slate-700 text-sm bg-slate-100">
                            {error}
                        </div>
                    )}

                    {!loading && !error && notifications.length === 0 && (
                        <div className="p-16 text-center max-w-sm mx-auto">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
                                <IconBell className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-slate-900">
                                You're all caught up!
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                                New bookings, OTP codes, and payment receipts will appear right here.
                            </p>
                        </div>
                    )}

                    {!loading && notifications.length > 0 && (
                        <div className="divide-y divide-slate-100">
                            {notifications.map((n) => {
                                const config =
                                    notificationConfig[n.type] || {
                                        title: "Notice",
                                        icon: <IconAlert className="w-4 h-4 text-slate-700" />,
                                        badge: "bg-slate-100 text-slate-700 border-slate-200"
                                    };

                                return (
                                    <div
                                        key={n._id}
                                        onClick={() => handleNotificationClick(n)}
                                        className={`p-5 sm:p-6 flex items-start gap-4 transition-colors cursor-pointer ${
                                            !n.isRead
                                                ? "bg-blue-50/30 hover:bg-blue-50/50"
                                                : "hover:bg-slate-50/60"
                                        }`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${config.badge}`}
                                        >
                                            {config.icon}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-display font-bold text-sm text-slate-900">
                                                        {config.title}
                                                    </h4>
                                                    {!n.isRead && (
                                                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                                                    )}
                                                </div>
                                                <span className="text-[11px] text-slate-400 font-medium shrink-0">
                                                    {getTimeAgo(n.createdAt)}
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                {n.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Notifications;