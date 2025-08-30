import { useState } from "react";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6 digits

  // Handle typing inside the 6 boxes
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  // Join the 6 digits and submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCode = code.join("");
    console.log("Verify with code:", finalCode);
    // Later → send to backend for verification
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side form */}
      <div className="w-1/2 flex flex-col justify-center px-40">
        <h1 className="text-2xl font-bold mb-2">
          Enter the code we just sent your email for verification
        </h1>
        <p className="text-gray-500 mb-6">
          We sent a 6-digit code to your email n********e@gmail.com.
        </p>

        {/* Input boxes */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-3 justify-center">
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

          <p className="text-gray-500 text-sm text-center">
            Didn’t get any code?{" "}
            <button
              type="button"
              className="text-red-500 font-medium hover:underline"
              onClick={() => alert("Resend code triggered")}
            >
              Resend Code
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-semibold"
          >
            Verify Email
          </button>
        </form>
      </div>

      {/* Right side image */}
      <div className="w-1/2">
        <img
          src="/images/verify-email-hero.jpg" // make sure to add your image here
          alt="verify"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
