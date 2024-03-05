import { Box, Button, Typography } from "@mui/material";
import styles from "./Home.module.css";
import CreateMeeting from "../CreateMeeting/CreateMeeting";
import JoinMeeting from "../JoinMeeting/JoinMeeting";
import { useState } from "react";

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
        <Typography
          variant="h5"
          height={"10rem"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          Hello {username}!!
        </Typography>
        <div id={styles.meeting}>
          <Typography
            variant="h5"
            component={"p"}
            sx={{ m: 1, textAlign: "center" }}
          >
            Meeting
          </Typography>
          <Box
            sx={{
              p: "2rem",
              border: "2px solid grey",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Button variant="contained" onClick={joinMeetingHandler}>
              Join Meeting
            </Button>
            <Typography sx={{ m: 1 }} component={"p"}>
              or
            </Typography>
            <Button variant="contained" onClick={createMeetingHandler}>
              Create Meeting
            </Button>
          </Box>
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
