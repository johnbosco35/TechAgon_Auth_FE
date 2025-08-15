import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import AuthButton from "../static/AuthButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg peer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="absolute text-sm text-gray-500 transition-all left-3 top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500">
              Password
            </span>
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

          {/* Submit */}
          <AuthButton text={"Login"} w={"w-full"} />

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
        </form>
      </div>
    </AuthLayout>
  );
}
