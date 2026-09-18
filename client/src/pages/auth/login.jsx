import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { loginSuccess } from "../../features/auth/authSlice";
import Navbar from "../../components/Navbar.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data.data;

      dispatch(
        loginSuccess({
          user,
          accessToken,
          refreshToken,
        })
      );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
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
          <form onSubmit={handleSubmit} className="space-y-6">

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

    </div>
  );
};

export default Login;