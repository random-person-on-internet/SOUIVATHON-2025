import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// pages
import {
  AddPosts,
  AllPosts,
  EditPost,
  Home,
  Login,
  Post,
  Signup,
  Scan,
  Physiotherapy,
  Suggestions,
} from "./pages";

// components
import { Protected } from "./components";

// state management
import { Provider } from "react-redux";
import store from "./store/store.js";

// routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <AddPosts />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/scan",
        element: (
          <Protected authentication>
            <Scan />
          </Protected>
        ),
      },
      {
        path: "/physiotherapy",
        element: (
          <Protected authentication>
            <Physiotherapy />
          </Protected>
        ),
      },
      {
        path: "/suggestions",
        element: (
          <Protected authentication>
            <Suggestions />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
