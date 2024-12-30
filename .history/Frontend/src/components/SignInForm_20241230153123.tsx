 
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Make sure to import styles

// export function SignInForm() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
//   const [error, setError] = useState("");

//   // Initialize toast notifications
//   const notify = (message: string, type: "success" | "error") => {
//     if (type === "success") {
//       toast.success(message);
//     } else {
//       toast.error(message);
//     }
//   };

//   const handleSendOtp = async (e: any) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://highway-delite-noteapp-1.onrender.com/user/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         }
//       );
//       const data = await response.json();
//       if (data.message) {
//         setOtpSent(true); // OTP sent successfully
//         setError("");
//         notify("OTP sent successfully!", "success"); // Show success toast
//       } else {
//         setError(data.error);
//         notify(data.error, "error"); // Show error toast
//       }
//     } catch (err) {
//       setError("An error occurred while sending the OTP");
//       notify("An error occurred while sending the OTP", "error");
//     }
//   };

//   const handleVerifyOtp = async (e: any) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://highway-delite-noteapp-1.onrender.com/user/verify-otp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, otp }),
//         }
//       );
//       const data = await response.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token); // Save token
//         window.location.href = "/notes"; // Redirect to notes
//         notify("Login successful!", "success"); // Show success toast
//       } else {
//         setError(data.error);
//         notify(data.error, "error"); // Show error toast
//       }
//     } catch (err) {
//       setError("An error occurred during OTP verification");
//       notify("An error occurred during OTP verification", "error");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Sign in</h2>
//       <p className="text-gray-600 mb-6">
//         Please log in using your email and OTP.
//       </p>

//       <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
//         <div className="space-y-4">
//           {/* Email Input */}
//           <div>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* OTP Input */}
//           <div>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 ${
//                 otpSent ? "focus:ring-blue-500" : "bg-gray-100"
//               }`}
//               required
//               disabled={!otpSent} // Disable OTP field until OTP is sent
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             {otpSent ? "Verify OTP" : "Send OTP"}
//           </button>
//         </div>
//       </form>

//       {/* Error Message */}
//       {error && <div className="text-red-500 mt-4">{error}</div>}

//       <div className="mt-6 text-center">
//         <p className="text-gray-600">
//           Need an account?{" "}
//           <Link to="/signup" className="text-blue-500 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import styles

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [error, setError] = useState("");

  // Initialize toast notifications
  const notify = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // Use navigate hook for navigation
  const navigate = useNavigate();

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://highway-delite-noteapp-1.onrender.com/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.message) {
        setOtpSent(true); // OTP sent successfully
        setError("");
        notify("OTP sent successfully!", "success"); // Show success toast
      } else {
        setError(data.error);
        notify(data.error, "error"); // Show error toast
      }
    } catch (err) {
      setError("An error occurred while sending the OTP");
      notify("An error occurred while sending the OTP", "error");
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://highway-delite-noteapp-1.onrender.com/user/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Save token
        navigate("/notes"); // Use navigate for redirection
        notify("Login successful!", "success"); // Show success toast
      } else {
        setError(data.error);
        notify(data.error, "error"); // Show error toast
      }
    } catch (err) {
      setError("An error occurred during OTP verification");
      notify("An error occurred during OTP verification", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sign in</h2>
      <p className="text-gray-600 mb-6">
        Please log in using your email and OTP.
      </p>

      <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* OTP Input */}
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 ${
                otpSent ? "focus:ring-blue-500" : "bg-gray-100"
              }`}
              required
              disabled={!otpSent} // Disable OTP field until OTP is sent
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Need an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

