import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  useEffect(() => {
    AOS.init({
      duration: 800, // or any custom duration you prefer
      once: true, // ensures animation happens once
    });
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] p-4">
      <div
        data-aos="fade-down"
        className="flex flex-col md:flex-row shadow-xl min-h-[450px] w-[750px] relative bg-white rounded-3xl overflow-hidden"
      >
        {/* Welcome Back Section */}
        <div
          data-aos="fade-right" // Default for mobile// Custom attr (explained below)
          className="bg-gradient-to-r from-[#512da8] to-[#5c6bc0] md:rounded-r-[160px] rounded-t-3xl md:rounded-t-none w-full md:w-[50%] flex justify-center items-center text-white py-8 md:py-0 px-6"
        >
          <div className="toggle-panel text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome Back!
            </h1>
            <p className="text-sm mb-5">Don't have an account?</p>
            <button
              onClick={() => navigate("/signup", { replace: true })}
              className="bg-transparent w-full max-w-[180px] p-2 rounded-xl shadow-2xs border-1 border-solid border-white cursor-pointer text-white font-semibold"
            >
              Register
            </button>
          </div>
        </div>

        {/* Login Form Section */}
        <div
          data-aos="fade-left"
          className="w-full md:w-[50%] flex items-center text-center p-6 md:p-0"
        >
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col items-center w-full"
          >
            <h1 className="font-bold text-[#333] text-3xl md:text-4xl mb-2">
              Login
            </h1>
            <div className="flex relative my-5 w-full max-w-[300px]">
              <input
                type="text"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box mb-2"
              />
              <FaEnvelope className="input-icon top-3.5" />
            </div>

            <div className="flex relative mb-5 w-full max-w-[300px]">
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-box"
              />
              <FaLock className="input-icon top-3.5" />
            </div>

            <div className="flex items-center mb-4 w-full max-w-[300px] justify-center">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-[#512da8] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-semibold mb-3">{error}</p>
            )}

            <button
              disabled={isLoading}
              className="bg-[#512da8] w-full max-w-[300px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold"
            >
              {isLoading ? (
                <Loader className="w-6 h-6 mx-auto animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
