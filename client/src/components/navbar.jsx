import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between font-semibold">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              R
            </span>
          </div>

          <span className="text-xl font-semibold tracking-tight text-gray-900">
            RentVerse
          </span>
        </div>


        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="#browse"
            className="text-base text-gray-600 hover:text-black transition"
          >
            Browse Equipments
          </a>

          <a
            href="#how-it-works"
            className="text-base text-gray-600 hover:text-black transition"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-base text-gray-600 hover:text-black transition"
          >
            About
          </a>

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-3">

          <button
            className="
              hidden sm:block
              px-4 py-2
              text-sm font-medium
              text-gray-700
              hover:text-black
              transition
            "
          >
            Login
          </button>

          <button
            className="
              px-5 py-2.5
              rounded-full
              bg-black
              text-white
              text-sm font-medium
              hover:bg-gray-800
              transition
            "
          >
            List Equipment
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;