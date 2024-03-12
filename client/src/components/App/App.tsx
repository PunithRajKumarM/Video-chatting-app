import { Typography } from "@mui/material";
import styles from "./App.module.css";
import GoogleLoginButton from "../GoogleLogin/GoogleLoginButton";
import { useEffect, useState } from "react";
import Home from "../Home/Home";

export default function App() {
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const isLogged = JSON.parse(
      sessionStorage.getItem("videoChatUser") as string
    );

    if (isLogged) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <>
      {!logged && (
        <div id={styles.app}>
          <div id={styles.appText}>
            <Typography variant="h4" component={"p"}>
            </Typography>
            {!logged && <GoogleLoginButton />}
          </div>
        </div>
      )}
      {logged && (
        <>
          <Home />
        </>
      )}
    </>
  );
}
