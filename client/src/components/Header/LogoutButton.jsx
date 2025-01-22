import React from "react";

// state management
import { useDispatch } from "react-redux";
import { logout } from "./../../store/authSlice";

// appwrite
import authService from "./../../appwrite/authService";

// components
import { Button } from "../index.js";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Error while logging out using Logout Button : ", error);
      });
  };

  return (
    <button
      // className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      className="px-4 py-2 text-sm font-medium text-gray-300 transition duration-200 rounded-md hover:bg-red-600 hover:text-white"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
