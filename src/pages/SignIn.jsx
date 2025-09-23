import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast for alerts
import api from "../api/axios";

import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import useAuthStore from "../store/authStore";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/signin", data);

      // Save token + user in Zustand store
      login(res.data.user, res.data.token);

      // Success toast
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      // Error toast
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    // 📱 Mobile: stack vertically | 💻 Desktop: split screen
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left side (Form) */}
      {/* Full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-40 py-10">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-500 mb-8">
          Enter your credentials to access your Dashboard
        </p>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <InputField
            type="email"
            placeholder="Enter your email address"
            register={register}
            name="email"
            error={errors.email?.message}
          />

          {/* Password */}
          <PasswordField
            placeholder="Enter your password"
            register={register}
            name="password"
            error={errors.password?.message}
          />

          {/* Forgot Password link */}
          <div className="flex justify-start">
            <Link to="/forgot-password" className="text-red-500 text-sm">
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <Button>Login</Button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right side (Hero image) */}
      {/* Hidden on mobile, shown only on desktop */}
      <div className="hidden md:flex w-1/2 bg-purple-600 items-center justify-center">
        <img
          src="/assets/signin-hero.jpg"
          alt="signin hero"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}