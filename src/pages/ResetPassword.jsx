import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast
import api from "../api/axios";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";

// Validation schema
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[!@#$%^&*]/, "Password must contain a symbol")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // extract token from route (/reset-password/:token)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      await api.post(`/auth/reset-password/${token}`, {
        password: data.newPassword,
      });

      // Success toast
      toast.success("Password reset successful!");
      navigate("/signin"); // redirect to login
    } catch (error) {
      // Error toast
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    // 📱 Mobile: vertical stack | 💻 Desktop: split screen
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left side (Form) */}
      {/* Full width on mobile, half width on desktop */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-40 py-10">
        <h1 className="text-3xl font-bold mb-2">Reset your password</h1>
        <p className="text-gray-500 mb-8">
          Create a new strong password for your account.
        </p>

        {/* Reset password form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <PasswordField
            placeholder="Create a new password"
            register={register}
            name="newPassword"
            error={errors.newPassword?.message}
          />

          {/* Confirm Password */}
          <PasswordField
            placeholder="Re-type your new password"
            register={register}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
          />

          {/* Submit button */}
          <Button>Reset Password</Button>
        </form>
      </div>

      {/* Right side (Hero image) */}
      {/* Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex w-1/2 bg-purple-600 items-center justify-center">
        <img
          src="/assets/reset-password-hero.jpg"
          alt="Reset password hero"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}