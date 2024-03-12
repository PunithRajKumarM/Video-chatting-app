import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import styles from "./Home.module.css";
import CreateMeeting from "../CreateMeeting/CreateMeeting";
import JoinMeeting from "../JoinMeeting/JoinMeeting";
import { useState } from "react";
// import VideoChatIcon from "@mui/icons-material/VideoChat";
import VideocamIcon from "@mui/icons-material/Videocam";

const buttonStyle = {
  bgcolor: "white",
  color: "rgb(25, 118, 210)",
  fontWeight: "600",
  "&:hover": {
    background: "whitesmoke",
  },
};

export default function Home() {
  const [meeting, setMeeting] = useState<string>("");

  const username = JSON.parse(
    sessionStorage.getItem("videoChatUser") as string
  ).name;

  function joinMeetingHandler() {
    setMeeting("openJoinMeeting");
  }

  function createMeetingHandler() {
    setMeeting("openCreateMeeting");
  }

  function closeMeeting() {
    setMeeting("");
  }

  return (
    <>
      <div id={styles.home}>
        <AppBar
          sx={{
            fontWeight: 600,
            bgcolor: "rgb(42,42,54)",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <VideocamIcon />
            <Typography>Hello {username}</Typography>
          </Toolbar>
        </AppBar>

        <div id={styles.meeting}>
          <Toolbar
            sx={{
              borderRadius: 4,
              textAlign: "center",
              p: "2rem",
              flexDirection: "column",
              bgcolor: "rgb(25, 118, 210)",
            }}
          >
            <Typography
              variant="h5"
              component={"p"}
              sx={{
                m: 1,
                textAlign: "center",
                fontWeight: 600,
                color: "white",
              }}
            >
              Meeting
            </Typography>
            <Toolbar sx={{ gap: 2 }}>
              <Button
                sx={buttonStyle}
                variant="contained"
                onClick={joinMeetingHandler}
              >
                Join Meeting
              </Button>
              <Divider orientation="vertical" />
              <Button
                sx={buttonStyle}
                variant="contained"
                onClick={createMeetingHandler}
              >
                Create Meeting
              </Button>
            </Toolbar>
          </Toolbar>
        </div>
      </div>
      {
        <CreateMeeting
          open={meeting === "openCreateMeeting"}
          close={closeMeeting}
        />
      }
      {
        <JoinMeeting
          open={meeting === "openJoinMeeting"}
          close={closeMeeting}
        />
      }
    </>
  );
}
