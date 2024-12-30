import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Indicates if OTP is sent
  const [error, setError] = useState(""); // Error messages
  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://highway-delite-noteapp-1.onrender.com/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, dob, email }),
        }
      );
      const data = await response.json();
      if (data.message) {
        setOtpSent(true); // OTP sent successfully
        setError(""); // Clear any previous errors
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Save JWT token
        navigate("/notes"); // Redirect to notes
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred during OTP verification");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sign up</h2>
      <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
        <div className="space-y-4">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />
          {/* DOB Input */}
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />
          {/* OTP Input */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
            disabled={!otpSent} // Disable OTP input until OTP is sent
            required
          />
          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded"
          >
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
