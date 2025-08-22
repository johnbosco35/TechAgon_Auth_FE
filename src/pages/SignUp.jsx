import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { RegisterUser } from "../Apis/AuthApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PulseLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const data = z
    .object({
      username: z.string().min(3, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        ),
      confirmPassword: z
        .string()
        .min(6, "Confirm Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    });

  // SetUp useFrom

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(data),
  });

  // const handelChange = (field, value) => {
  //   setFromDate({ ...formDate, [field]: value });
  // };
  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    const formData = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await RegisterUser(formData);
      console.log("Registration successful:", response);
      setLoading(false);
      setError("");
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
      setLoading(false);
      setError("Registration failed: " + error.message);
      reset();
    }
  };

  const handleLoginGoggle = () => {
    window.location.href = "http://localhost:3000/api/v1/users/auth/google";
  };
  return (
    <AuthLayout>
      <div className=" w-[60%] space-y-6 ">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-600">
            Join Nucleus UI and start designing with ease.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center">
              <FiAlertCircle
                className="w-5 h-5 mr-2 text-red-600"
                onClick={() => setError("")}
              />
              <span>{error}</span>
            </div>
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
                <div>
                  {Object.values(errors).map((err, index) => (
                    <div key={index} className="text-sm">
                      {err.message}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => reset()} // clears form + errors
                type="button"
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("username")}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showpassword ? "text" : "password"}
            // value={password}
            {...register("password")}
            // onChange={(e) => handelChange("password", e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 top-4"
          >
            {showpassword ? (
              <FaEye className="w-5 h-5" />
            ) : (
              <FaEyeSlash className="w-5 h-5" />
            )}
          </button>
                    
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type={showpassword ? "text" : "password"}
            // value={password}
            {...register("confirmPassword")}
            // onChange={(e) => handelChange("password", e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 top-4"
          >
            {showpassword ? (
              <FaEye className="w-5 h-5" />
            ) : (
              <FaEyeSlash className="w-5 h-5" />
            )}
          </button>
                    
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Submit Button */}

          <button
            type="submit"
            className={`w-full px-4 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700`}
          >
            {loading ? (
              <PulseLoader color="#fff" size={10} />
            ) : (
              "Create account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center w-full text-sm ">
            <span className="px-2 text-gray-500 ">OR</span>
          </div>
        </div>

        {/* Google Sign-up */}
        <button
          type="button"
          className="flex items-center justify-center w-full gap-3 px-4 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:border-gray-400"
          onClick={handleLoginGoggle}
        >
          <FcGoogle size={25} />
          Sign up with Google
        </button>

        {/* Link to Login */}
        <p className="text-sm text-center text-gray-600">
          Have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
