import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AgentNavbar = () => {

  const navigate = useNavigate();

  const { notifications } = useSelector(
    (state) => state.notification
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const handleLogout = () => {
    // We will connect Redux logout here
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between font-semibold">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              R
            </span>
          </div>

          <span className="text-xl font-semibold tracking-tight text-gray-900">
            RentVerse
          </span>
        </Link>


        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/agent/dashboard"
            className="text-base text-gray-600 hover:text-black transition"
          >
            Dashboard
          </Link>

          <Link
            to="/agent/dashboard"
            className="text-base text-gray-600 hover:text-black transition"
          >
            Deliveries
          </Link>

          <Link
            to="/agent/delivery/history"
            className="text-base text-gray-600 hover:text-black transition"
          >
            History
          </Link>

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-4">

                    {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              px-4 py-2
              text-sm font-medium
              text-gray-700
              hover:text-black
              transition
            "
          >
            Logout
          </button>

          {/* Notification */}
          <Link
            to="/notifications"
            className="
              relative
              flex flex-col
              items-center
              justify-center
              gap-0.5
              text-gray-700
              hover:text-black
              transition
            "
            aria-label="Notifications"
          >
            <div
              className="
                relative
                w-12 h-10
                flex items-center justify-center
                rounded-xl
                hover:bg-gray-100
                transition
              "
            >
              {/* Bell Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6"
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
                    absolute top-0.5 right-0
                    min-w-5 h-5
                    px-1
                    rounded-full
                    bg-black
                    text-white
                    text-[10px]
                    font-bold
                    flex items-center justify-center
                    border-2 border-white
                  "
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>

            <span className="text-xs font-medium text-gray-600">
              Notifications
            </span>
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default AgentNavbar;
