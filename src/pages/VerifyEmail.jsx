import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast
import api from "../api/axios";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6-digit code array
  const navigate = useNavigate();
  const { token } = useParams(); // capture token from route (/verify-email/:token)

  // Handle typing inside each digit box
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  // Join digits and submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = code.join("");

    try {
      // 🔵 Call backend to verify email with token + code
      await api.post(`/auth/verify-email/${token}`, { code: finalCode });

      toast.success("Email verified successfully!");
      navigate("/signin"); // redirect to sign in page
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    // 📱 Mobile: stack vertically | 💻 Desktop: split screen
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left side form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-40 py-10">
        <h1 className="text-2xl font-bold mb-2">
          Enter the code we just sent to your email for verification
        </h1>
        <p className="text-gray-500 mb-6">
          We sent a 6-digit code to your email n********e@gmail.com.
        </p>

        {/* Input + Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Six digit boxes */}
          <div className="flex space-x-3 justify-start">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-12 h-12 border rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ))}
          </div>

          {/* Resend link */}
          <p className="text-gray-500 text-sm text-left">
            Didn’t get any code?{" "}
            <button
              type="button"
              className="text-red-500 font-medium hover:underline"
              onClick={() => toast("📩 Resend code triggered")} // toast instead of alert
            >
              Resend Code
            </button>
          </p>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-semibold"
          >
            Verify Email
          </button>
        </form>
      </div>

      {/* Right side image */}
      {/* Hidden on mobile, shown only on desktop */}
      <div className="hidden md:flex w-1/2">
        <img
          src="/assets/verify-email-hero.jpg"
          alt="verify"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}