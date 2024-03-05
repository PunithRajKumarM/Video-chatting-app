import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App/App";
import Home from "./components/Home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Call from "./components/Call/Call";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home/call",
    element: <Call />,
  },
]);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={
        process.env.REACT_APP_CLIENT_ID ||
        "541528814520-81m2osabfoumkk4c51u8uaqor4c2q4aj.apps.googleusercontent.com"
      }
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
