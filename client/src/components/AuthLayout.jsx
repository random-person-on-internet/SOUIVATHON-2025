import React, { useEffect, useState } from "react";

// state management
import { useSelector } from "react-redux";

// routes
import { useNavigate } from "react-router-dom";

// components
import { Loader } from "./index.js";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // true && false not equal to true which is true => go login
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    }
    // not true and true not equal to true which is false => false and false => true
    else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return loading ? <Loader /> : <>{children}</>;
}
