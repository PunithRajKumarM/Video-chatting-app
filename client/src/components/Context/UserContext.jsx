import React, { createContext } from "react";

export const UserContext = createContext("");

export default function UserContextProvider({ children }) {
  let currentUser = JSON.parse(sessionStorage.getItem("videoChatUser"));
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}
