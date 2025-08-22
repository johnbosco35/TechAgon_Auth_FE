import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginUser } from "../Apis/AuthApi";
import { PulseLoader } from "react-spinners";
import { FiAlertCircle } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = z.object({
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
});

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Load saved email if rememberMe is enabled
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedRemember) {
      setValue("email", savedEmail); // prefill email
      setValue("password", savedPassword); // prefill password
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      // ✅ Save/remove email in localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberMe");
      }

      const response = await LoginUser(data);
      setLoading(false);
      console.log("Login successful:", response);

      navigate("/home");
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please check your credentials.");
      console.error("Error during login:", err);
      reset({ password: "" }); // clear password only
    }
  };

  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:3000/api/v1/users/auth/google";
  };

  return (
    <AuthLayout>
      <div className="w-[60%] space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back to Nucleus
          </h1>
          <p className="text-gray-600">
            Build your design system effortlessly with our powerful component
            library.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError("")}
                type="button"
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Validation Errors */}
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
                onClick={() => reset()}
                type="button"
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            {...register("email")}
            placeholder=" "
            className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg peer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <span className="absolute text-sm text-gray-500 transition-all left-3 top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500">
            Email
          </span>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showpassword ? "text" : "password"}
            {...register("password")}
            placeholder=" "
            className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg peer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <span className="absolute text-sm text-gray-500 transition-all left-3 top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500">
            Password
          </span>

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

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            Forgot password?
          </button>
        </div>

        {/* Remember Me Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Remember sign in details
          </span>
          <button
            type="button"
            onClick={() => setRememberMe(!rememberMe)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              rememberMe ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                rememberMe ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            {loading ? <PulseLoader color="#fff" size={10} /> : "Login Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">OR</span>
          </div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleLoginGoogle}
          className="flex items-center justify-center w-full gap-3 px-4 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:border-gray-400"
        >
          <FcGoogle size={25} />
          Continue with Google
        </button>

        {/* Link to Sign Up */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/"
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
