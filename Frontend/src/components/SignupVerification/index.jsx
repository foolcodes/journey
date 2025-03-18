import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const SignupVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (pastedData.length > 1) {
      const newCode = [...code];
      const pastedChars = pastedData.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedChars[i] || newCode[i];
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/overview");
      toast.success("Email verified successfully");
    } catch (error) {}
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="w-full min-h-screen bg-[#080C18] flex justify-center items-center p-4">
      <div className="bg-[#1E2A47] w-full max-w-md rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-xl">
        <h1 className="text-gray-100 text-2xl sm:text-3xl font-bold text-center mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-300 text-sm sm:text-base text-center mb-6">
          Enter the 6-digit code sent to your email address.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col items-center w-full"
        >
          <div className="flex justify-between w-full gap-2 sm:gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:border-[#080C18]"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="bg-indigo-600 w-full sm:w-[300px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold hover:from-[#512da8] hover:to-[#5c6bc0] focus:outline-none focus:ring-2 focus:ring-[#512da8] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default SignupVerification;
