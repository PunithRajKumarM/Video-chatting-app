import {
  AppBar,
  Button,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "./Home.module.css";
import CreateMeeting from "../CreateMeeting/CreateMeeting";
import JoinMeeting from "../JoinMeeting/JoinMeeting";
import { useContext, useEffect, useState } from "react";
// import VideoChatIcon from "@mui/icons-material/VideoChat";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../Context/RoomProvider";

const buttonStyle = {
  bgcolor: "rgb(42, 42, 54)",
  fontWeight: "600",
  "&:hover": {
    background: "rgb(56,56,80)",
  },
  border: "none",
  py: 2,
  px: 3,
};

export default function Home() {
  const [meeting, setMeeting] = useState<string>("");
  const [joinUrl, setJoinUrl] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const navigate = useNavigate();
  const { ws } = useContext(RoomContext);

  useEffect(() => {
    ws.emit("generate-roomId");
    ws.on("generated-roomId", ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      console.log("RoomId", roomId);
    });
  }, []);

  const username = JSON.parse(
    sessionStorage.getItem("videoChatUser") as string
  ).name;

  // function joinMeetingHandler() {
  //   setMeeting("openJoinMeeting");
  // }

  function joinMeetingHandler() {
    if (!joinUrl) {
      alert("Enter url to join");
      return;
    }
    console.log(joinUrl);

    navigate(`/room/${joinUrl}`);
    navigate(0);
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
          {/* <Toolbar
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
          </Toolbar> */}
          <Toolbar
            sx={{
              width: "50%",
              textAlign: "center",
              color: "rgb(42, 42, 54)",
            }}
          >
            <Typography variant="h4">
              Video calls and meetings for everyone
            </Typography>
          </Toolbar>
          <Toolbar
            sx={{
              gap: 1,
              flexDirection: "column",
            }}
          >
            <Button
              sx={buttonStyle}
              variant="contained"
              onClick={createMeetingHandler}
            >
              Create Meeting
            </Button>
            <Typography variant="h6" sx={{ color: "rgb(42, 42, 54)" }}>
              or
            </Typography>
            <div id={styles.joinBtn}>
              <TextField
                sx={{
                  borderRadius: "0px",
                }}
                placeholder="Enter a code"
                onChange={(e) => setJoinUrl(e.target.value)}
                value={joinUrl}
                InputProps={{
                  style: {
                    height: "auto",
                    flex: "1",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgb(42, 42, 54)",
                  fontWeight: "600",
                  "&:hover": {
                    background: "rgb(56,56,80)",
                  },
                  py: 2,
                  px: 3,
                  border: "none",
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px",
                }}
                disabled={!joinUrl}
                onClick={joinMeetingHandler}
              >
                Join
              </Button>
            </div>
          </Toolbar>
        </div>
      </div>
      {
        <CreateMeeting
          roomId={roomId}
          open={meeting === "openCreateMeeting"}
          close={closeMeeting}
        />
      }
      {/* {
        <JoinMeeting
          open={meeting === "openJoinMeeting"}
          close={closeMeeting}
        />
      } */}
    </>
  );
}
