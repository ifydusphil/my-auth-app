import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast"; // import toast

import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[!@#$%^&*]/, "Password must contain a symbol")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  terms: yup.bool().oneOf([true], "You must accept the terms"),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/signup", data);
      toast.success("Verification email sent!"); // success toast
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); // error toast
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side (Form) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-40 py-10">
        <h1 className="text-3xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-500 mb-8">
          Let’s get started with a 30 day free trial
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            placeholder="Enter a username"
            register={register}
            name="username"
            error={errors.username?.message}
          />
          <InputField
            type="email"
            placeholder="Enter your email"
            register={register}
            name="email"
            error={errors.email?.message}
          />
          <PasswordField
            placeholder="Create a strong password"
            register={register}
            name="password"
            error={errors.password?.message}
          />
          <PasswordField
            placeholder="Re-type your password"
            register={register}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
          />

          {/* Custom Checkbox */}
          <div>
            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("terms")}
                className="hidden peer"
              />
              <div className="w-5 h-5 border rounded flex items-center justify-center mr-2 peer-checked:bg-red-500">
                <img
                  src="/assets/icons/check.svg"
                  alt="checked"
                  className="w-4 h-4 hidden peer-checked:block"
                />
              </div>
              <span className="text-sm">
                By clicking Sign Up you agree to{" "}
                <span className="text-blue-500">Terms & Conditions</span>
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}
          </div>

          <Button>Sign Up</Button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an Account?{" "}
          <Link to="/signin" className="text-red-500 font-medium">
            Login
          </Link>
        </p>
      </div>

      {/* Right side image */}
      <div className="hidden md:flex w-1/2 bg-purple-600 items-center justify-center">
        <img
          src="/assets/signup-hero.jpg"
          alt="Sign up hero"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}