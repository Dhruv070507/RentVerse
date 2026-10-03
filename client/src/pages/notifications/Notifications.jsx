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
      dispatch(markNotificationAsRead(notification._id));
    }
  };

  const handleMarkAllAsRead = () => {

    if (unreadCount > 0) {
      dispatch(markAllNotificationsAsRead());
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] font-sans">

        <Navbar />

{/* Header */}
<section className="max-w-5xl mx-auto px-6 pt-28 pb-10">

  <div className="flex flex-col items-center text-center">

    <p className="text-base font-medium text-gray-500 mb-3">
      RentVerse
    </p>

    <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
      Notifications
    </h1>

    <p className="mt-4 text-base md:text-lg text-gray-500">
      {unreadCount > 0
        ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
        : "You're all caught up"}
    </p>

    {unreadCount > 0 && (
      <button
        onClick={handleMarkAllAsRead}
        className="
          mt-6
          px-5 py-2.5
          rounded-full
          bg-black
          text-white
          text-sm font-medium
          hover:bg-gray-800
          transition
        "
      >
        Mark all as read
      </button>
    )}

  </div>

</section>



      {/* Notifications */}
      <section className="max-w-5xl mx-auto px-6 pb-20">

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          {loading && (
            <div className="px-6 py-10 text-center text-sm text-gray-500">
              Loading notifications...
            </div>
          )}


          {error && !loading && (
            <div className="px-6 py-10 text-center text-sm text-red-500">
              {error}
            </div>
          )}


          {!loading && !error && notifications.length === 0 && (
            <div className="px-6 py-16 text-center">

              <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-xl">
                🔔
              </div>

              <h2 className="mt-4 text-base font-semibold text-gray-900">
                No notifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                New rental, payment and delivery updates will appear here.
              </p>

            </div>
          )}


          {!loading && notifications.length > 0 && (
            <div>

              {notifications.map((notification) => {

                const config =
                  notificationConfig[notification.type] || {
                    title: "Notification",
                    icon: "•"
                  };

                return (
                  <button
                    key={notification._id}
                    onClick={() =>
                      handleNotificationClick(notification)
                    }
                    className={`
                      w-full
                      flex items-center gap-4
                      px-5 py-4
                      text-left
                      border-b border-gray-100
                      last:border-b-0
                      transition
                      ${
                        notification.isRead
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    `}
                  >

                    {/* Icon */}
                    <div
                      className={`
                        shrink-0
                        w-9 h-9
                        rounded-full
                        flex items-center justify-center
                        text-sm font-semibold
                        ${
                          notification.isRead
                            ? "bg-gray-100 text-gray-500"
                            : "bg-black text-white"
                        }
                      `}
                    >
                      {config.icon}
                    </div>


                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2">

                        <h3 className="text-sm font-semibold text-gray-900">
                          {config.title}
                        </h3>

                        {!notification.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        )}

                      </div>

                      <p className="mt-0.5 text-sm text-gray-600 truncate">
                        {notification.message}
                      </p>

                    </div>


                    {/* Time */}
                    <span className="shrink-0 text-xs text-gray-400">
                      {getTimeAgo(notification.createdAt)}
                    </span>

                  </button>
                );
              })}

            </div>
          )}

        </div>

      </section>

    

            <Footer />
</div>
  );
};

export default Notifications;