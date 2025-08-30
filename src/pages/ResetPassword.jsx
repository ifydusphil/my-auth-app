import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
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
  const { token } = useParams(); // we expect /reset-password/:token route

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.post(`/auth/reset-password/${token}`, {
        password: data.newPassword,
      });
      alert("✅ Password reset successful!");
      navigate("/signin");
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Reset failed"));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side (Form) */}
      <div className="w-1/2 flex flex-col justify-center px-40">
        <h1 className="text-3xl font-bold mb-2">Reset your password</h1>
        <p className="text-gray-500 mb-8">
          Create a new strong password for your account.
        </p>

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

          {/* Submit */}
          <Button>Reset Password</Button>
        </form>
      </div>

      {/* Right side (Hero image) */}
      <div className="w-1/2 bg-purple-600 flex items-center justify-center">
        <img
          src="/assets/reset-password-hero.jpg" // Replace with your reset password hero image
          alt="Reset password hero"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}
