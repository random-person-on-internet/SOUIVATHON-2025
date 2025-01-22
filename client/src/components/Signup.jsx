import React, { useState } from "react";

// state management
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";

// appwrite
import authService from "../appwrite/authService";

// route
import { Link, useNavigate } from "react-router-dom";

// components
import { Input, Button, Logo } from "./index";

// react-hook-form
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");

  const signUp = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);

      if (session) {
        // get user data
        const userData = await authService.getCurrentUser();

        // update store
        dispatch(
          storeLogin({
            userData: userData,
          })
        );

        // navigate
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 shadow-lg border border-gray-700">
        {/* Logo */}

        <div className="mb-b flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}

        <h2 className="text-center text-2xl font-extrabold text-white">
          Sign up to create account
        </h2>

        {/* Login button */}

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary hover:text-green-400 transition-all duration-200"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}

        {error && (
          <p className="text-red-500 mt-6 text-center font-medium">{error}</p>
        )}

        {/* Form */}

        <form onSubmit={handleSubmit(signUp)}>
          <div className="space-y-5">
            {/* Name */}
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            {/* Email */}

            <Input
              label="Email: "
              placeholder="Enter yout email"
              type="email"
              // compulsory to spread register
              {...register("email", {
                // options
                required: true,
                validate: {
                  isValidEmail: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email address",
                },
              })}
            />

            {/* Password */}

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />

            {/* Submit Button */}

            <Button type="submit" className="w-full" children="Sign in" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

// return (
//   <div className="flex items-center justify-center">
//     <div
//       className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
//     >
//       {/* Logo */}

//       <div className="mb-2 flex justify-center">
//         <span className="inline-block w-full max-w-[100px]">
//           <Logo width="100%" />
//         </span>
//       </div>

//       {/* Heading */}

//       <h2 className="text-center text-2xl font-bold leading-tight">
//         Sign up to create account
//       </h2>

//       {/* Login button */}

//       <p className="mt-2 text-center text-base text-black/60">
//         Already have an account?&nbsp;
//         <Link
//           to="/login"
//           className="font-medium text-primary transition-all duration-200 hover:underline"
//         >
//           Sign In
//         </Link>
//       </p>

//       {/* Error */}

//       {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//       {/* Form */}

//       <form onSubmit={handleSubmit(signUp)}>
//         <div className="space-y-5">
//           {/* Name */}
//           <Input
//             label="Full Name:"
//             placeholder="Enter your full name"
//             {...register("name", {
//               required: true,
//             })}
//           />

//           {/* Email */}

//           <Input
//             label="Email: "
//             placeholder="Enter yout email"
//             type="email"
//             // compulsory to spread register
//             {...register("email", {
//               // options
//               required: true,
//               validate: {
//                 isValidEmail: (value) =>
//                   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                   "Invalid email address",
//               },
//             })}
//           />

//           {/* Password */}

//           <Input
//             label="Password: "
//             placeholder="Enter your password"
//             type="password"
//             {...register("password", {
//               required: true,
//             })}
//           />

//           {/* Submit Button */}

//           <Button type="submit" className="w-full" children="Sign in" />
//         </div>
//       </form>
//     </div>
//   </div>
// );
