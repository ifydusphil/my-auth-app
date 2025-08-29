import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
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

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/signin", data);

      // Save token + user in Zustand store
      login(res.data.user, res.data.token);

      alert("✅ Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Invalid credentials"));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side (Form) */}
      <div className="w-1/2 flex flex-col justify-center px-40">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-500 mb-8">
          Enter your credential to access your Dashboard
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

          {/* Password */}
          <PasswordField
            placeholder="Enter your password"
            register={register}
            name="password"
            error={errors.password?.message}
          />

          {/* Forgot Password */}
          <div className="flex justify-start">
            <Link to="/forgot-password" className="text-red-500 text-sm">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
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
      <div className="w-1/2 bg-purple-600 flex items-center justify-center">
        <img
          src="/assets/signin-hero.jpg" // Replace with your login hero image
          alt="signin hero"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}
