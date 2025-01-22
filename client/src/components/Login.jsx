import React, { useState } from "react";

// routes
import { Link, useNavigate } from "react-router-dom";

// state management
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";

// components
import { Button, Input, Logo } from "./index";

// appwrite
import authService from "../appwrite/authService";

// react-hook-form
import { useForm } from "react-hook-form";

function Login() {
  // route
  const navigate = useNavigate();
  // state
  const dispatch = useDispatch();
  // form
  const { register, handleSubmit } = useForm();
  // error
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        // if logged in, get user data
        const userData = await authService.getCurrentUser();

        // set as loggen in in store
        if (userData) {
          dispatch(
            storeLogin({
              userData: userData,
            })
          );
        }

        // if loggen in, just redirect them to root
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

        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}

        <h2 className="text-center text-2xl font-extrabold text-white">
          Sign in to your account
        </h2>

        {/* Sign-up Button */}

        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary hover:text-green-400 transition-all duration-200"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}

        {error && (
          <p className="text-red-500 mt-6 text-center font-medium">{error}</p>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="mt-6 space-y-5">
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

export default Login;
