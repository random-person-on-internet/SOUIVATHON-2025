import { useEffect, useState } from "react";
import "./App.css";

// state management
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

// components
import { Header, Footer, Loader } from "./components";

// appwrite
import authService from "./appwrite/authService";

// routes
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Error while initially fetching user data : ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-400 text-gray-800">
      <Header />
      <main className="flex-grow px-4 py-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

// return !loading ? (
//   <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
//     <div className="w-full block">
//       <Header />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   </div>
// ) : (
//   <Loader />
// );
