import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App/App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Room from "./components/Room/Room";
import { RoomProvider } from "./components/Context/RoomProvider";
import UserContextProvider from "./components/Context/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider
    clientId={
      process.env.REACT_APP_CLIENT_ID ||
      "541528814520-81m2osabfoumkk4c51u8uaqor4c2q4aj.apps.googleusercontent.com"
    }
  >
    <BrowserRouter>
      <UserContextProvider>
        <RoomProvider>
          <Routes>
            <Route path={"/"} element={<App />} />
            <Route path={"/room/:id"} element={<Room />} />
          </Routes>
        </RoomProvider>
      </UserContextProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
