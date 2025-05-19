import { useState, useRef, useEffect } from "react";
import { api, snackbar } from "@/utils";
import { useLocation, useNavigate } from "react-router";

export default function OtpVerification() {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // states
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  // derived states
  const email = location.state?.email;

  // Create refs for each input
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content is numeric and has valid length
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, idx) => {
      if (idx < 6) {
        newOtp[idx] = digit;
        inputRefs[idx].current.value = digit;
      }
    });

    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current.focus();
    } else {
      inputRefs[5].current.focus();
    }
  };

  const handleSubmit = async () => {
    if (otp.some((digit) => digit === "")) {
      snackbar("Please enter all 6 digits", "error", "top-center");
      return;
    }

    setIsSubmitting(true);

    try {
      const otpCode = otp.join("");
      const { status, message } = await api.post("/verify-otp", {
        email,
        otp: otpCode,
      });

      if (status === 201) {
        snackbar(
          message || "Account verified successfully!",
          "success",
          "top-center"
        );
        navigate("/signin");
      }
    } catch (error) {
      const statusCode = error.status || 500;
      const errorMessage = error.message || "Verification failed";
      snackbar(`Error ${statusCode}: ${errorMessage}`, "error", "top-center");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      const { status, message } = await api.post("/resend-otp", { email });

      if (status === 200) {
        snackbar(message || "OTP sent successfully!", "success");
        setResendDisabled(true);
        setTimer(30);
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to resend OTP";
      snackbar(errorMessage, "error");
    }
  };

  useEffect(() => {
    let interval;

    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [resendDisabled, timer]);

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-5 bg-zinc-800 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            We've sent a 6-digit verification code to your email
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : null}
                className="w-12 h-14 text-center bg-transparent border border-zinc-600 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
              />
            ))}
          </div>
        </div>

        <button
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all duration-150 flex items-center justify-center text-sm"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
          {!isSubmitting && (
            <i className="fas fa-check-circle ml-2 text-xs"></i>
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-zinc-400 text-sm">
            Didn't receive the code?{" "}
            <button
              onClick={handleResendOtp}
              disabled={resendDisabled}
              className={`text-blue-400 hover:underline focus:outline-none ${
                resendDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {resendDisabled ? `Resend in ${timer}s` : "Resend Code"}
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-zinc-400 text-sm hover:text-zinc-300 transition-colors focus:outline-none"
          >
            <i className="fas fa-arrow-left mr-1 text-xs"></i> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
