import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast
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

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      await api.post("/auth/forgot-password", data);

      // Success toast
      toast.success("Reset link sent to your email!");
    } catch (error) {
      // Error toast
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // 📱 Mobile: vertical stack | 💻 Desktop: split screen
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left side (Form) */}
      {/* Full width on mobile, half width on desktop */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-40 py-10">
        <h1 className="text-3xl font-bold mb-2">Forgot your password?</h1>
        <p className="text-gray-500 mb-8">
          Enter your registered email. We’ll send you a link to reset your password.
        </p>

        {/* Forgot password form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email input */}
          <InputField
            type="email"
            placeholder="Enter your email address"
            register={register}
            name="email"
            error={errors.email?.message}
          />

          {/* Submit button */}
          <Button>Send Reset Link</Button>
        </form>

        {/* Footer link */}
        <p className="mt-4 text-sm text-center">
          Remembered your password?{" "}
          <Link to="/signin" className="text-red-500 font-medium">
            Back to Sign In
          </Link>
        </p>
      </div>

      {/* Right side (Hero image) */}
      {/* Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex w-1/2 bg-purple-600 items-center justify-center">
        <img
          src="/assets/forgot-password-hero.jpg"
          alt="Forgot password hero"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}