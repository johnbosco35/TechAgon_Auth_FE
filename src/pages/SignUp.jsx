// import { useState } from "react";
// import { Link } from "react-router-dom";
// import AuthLayout from "../components/AuthLayout";
// import { FcGoogle } from "react-icons/fc";

// export default function SignUp() {
//   // const [name] = useState("Alex Jordan");
//   // const [email] = useState("alex.jordan@gmail.com");
//   // const [password, setPassword] = useState("••••••••••");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   return (
//     <AuthLayout>
//       <div className="w-[60%] space-y-6">
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Create your account
//           </h1>
//           <p className="text-gray-600">
//             Join Nucleus UI and start designing with ease.
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-4">
//           {/* Name */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder=" "
//               className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg peer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <span className="absolute text-sm text-gray-500 transition-all left-3 top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500">
//               Name
//             </span>
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <input
//               type="email"
//               placeholder=" "
//               className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg peer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <span className="absolute text-sm text-gray-500 transition-all left-3 top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500">
//               Email
//             </span>
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type="password"
//               // value={password}
//               // onChange={(e) => setPassword(e.target.value)}
//               placeholder=" "
//               className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg peer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <span className="absolute text-sm text-gray-500 transition-all left-3 top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500">
//               Password
//             </span>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder=" "
//               className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg peer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <span className="absolute text-sm text-gray-500 transition-all left-3 top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500">
//               Confirm Password
//             </span>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full px-4 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
//           >
//             Create account
//           </button>

//           {/* Divider */}
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center w-full text-sm">
//               <span className="px-2 text-gray-500">OR</span>
//             </div>
//           </div>

//           {/* Google Sign-up */}
//           <button
//             type="button"
//             className="flex items-center justify-center w-full gap-3 px-4 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:border-gray-400"
//           >
//             <FcGoogle size={25} />
//             Sign up with Google
//           </button>

//           {/* Link to Login */}
//           <p className="text-sm text-center text-gray-600">
//             Have an account?{" "}
//             <Link
//               to="/login"
//               className="font-medium text-purple-600 hover:text-purple-700"
//             >
//               Log in
//             </Link>
//           </p>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import AuthButton from "../static/AuthButton";
import { z } from "zod";
import { RegisterUser } from "../Apis/AuthApi";

export default function SignUp() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [formDate, setFromDate] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

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

  const handelChange = (field, value) => {
    setFromDate({ ...formDate, [field]: value });
  };
  const some = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = data.safeParse(formDate);
    console.log(result);

    if (!result.success) {
      const error = result.error.format();
      setError({
        username: error.username._errors[0],
        email: error.email._errors[0],
        password: error.password._errors[0],
        confirmPassword: error.confirmPassword._errors[0],
      });
    }
    try {
      const response = await RegisterUser(formDate);

      console.log(response);
    } catch (error) {
      console.log(error);
      // setError(error.message);
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

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              // value={name}
              onChange={(e) => handelChange("username", e.target.value)}
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
              // value={email}
              onChange={(e) => handelChange("email", e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              // type="password"
              // value={password}
              onChange={(e) => handelChange("password", e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              // type="password"
              // value={confirmPassword}
              onChange={(e) => handelChange("confirmPassword", e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700`}
          >
            Create Account
          </button>

          {/* Submit Button */}
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
