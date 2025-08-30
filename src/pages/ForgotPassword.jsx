import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import api from "../api/axios";
import InputField from "../components/InputField";
import Button from "../components/Button";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/forgot-password", data);
      alert("✅ Reset link sent to your email!");
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side (Form) */}
      <div className="w-1/2 flex flex-col justify-center px-40">
        <h1 className="text-3xl font-bold mb-2">Forgot your password?</h1>
        <p className="text-gray-500 mb-8">
          Enter your registered email. We’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <InputField
            type="email"
            placeholder="Enter your email address"
            register={register}
            name="email"
            error={errors.email?.message}
          />

          {/* Submit */}
          <Button>Send Reset Link</Button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-center">
          Remembered your Password?{" "}
          <Link to="/signin" className="text-red-500 font-medium">
            Back to Sign In
          </Link>
        </p>
      </div>

      {/* Right side (Hero image) */}
      <div className="w-1/2 bg-purple-600 flex items-center justify-center">
        <img
          src="/assets/forgot-password-hero.jpg" // Replace with your forgot password hero image
          alt="Forgot password hero"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}
