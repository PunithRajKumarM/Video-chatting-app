import { Button, Typography } from "@mui/material";
import styles from "./App.module.css";
import GoogleLoginButton from "../GoogleLogin/GoogleLoginButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [logged, setLogged] = useState<boolean>(false);
  const navigate = useNavigate();

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

  function homeHandler() {
    navigate("/home");
  }

  return (
    <div id={styles.app}>
      <div id={styles.appText}>
        <Typography
          sx={{ textShadow: "0px 0px 2px white" }}
          variant="h2"
          color={"white"}
        >
          Welcome
        </Typography>
        <Typography
          sx={{ textShadow: "0px 0px 2px white" }}
          variant="h3"
          color={"white"}
        >
          to the video chat!
        </Typography>
        {!logged && <GoogleLoginButton />}
        {logged && (
          <Button
            variant="contained"
            sx={{ mt: "1rem", boxShadow: "0px 0px 2px dodgerblue" }}
            onClick={homeHandler}
          >
            Start chat
          </Button>
        )}
      </div>
    </div>
  );
}
