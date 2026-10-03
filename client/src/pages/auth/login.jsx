import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/Footer.jsx";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password
      })
    );

    // Check whether login was successful
    if (loginUser.fulfilled.match(result)) {

      const user = result.payload.user;

      // Redirect based on user role
      if (user.role === "delivery_agent") {

        navigate("/agent/dashboard");

      } else if (user.role === "admin") {

        navigate("/admin/dashboard");

      } else {

        navigate("/");
      }
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">

      <Navbar />

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20">

        <section className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-10">

            <p className="font-sans text-base tracking-[0.1em] text-gray-400 uppercase mb-2">
              WELCOME BACK
            </p>

            <h1 className="font-display text-4xl md:text-5xl leading-tight text-[#0b1b34]">
              Login to RentVerse.
            </h1>

            <p className="font-sans mt-4 text-sm text-gray-500">
              Access your rentals, equipment and account.
            </p>

          </div>


          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Error */}
            {error && (
              <div className="font-sans text-sm text-red-500 border border-red-100 bg-red-50 rounded-lg px-4 py-3">
                {error}
              </div>
            )}


            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="font-sans block text-sm text-[#0b1b34] mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="font-sans w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-[#0b1b34] placeholder:text-gray-400 outline-none transition focus:border-[#0b1b34]"
              />

            </div>


            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="font-sans text-sm text-[#0b1b34]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="font-sans text-xs text-gray-400 hover:text-[#0b1b34] transition"
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="font-sans w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-[#0b1b34] placeholder:text-gray-400 outline-none transition focus:border-[#0b1b34]"
              />

            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="font-sans w-full px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          {/* Register */}
          <div className="text-center mt-8">

            <p className="font-sans text-sm text-gray-500">

              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-[#0b1b34] hover:underline"
              >
                Create an account
              </button>

            </p>

          </div>

        </section>

      </main>

    

            <Footer />
</div>
  );
};

export default Login;