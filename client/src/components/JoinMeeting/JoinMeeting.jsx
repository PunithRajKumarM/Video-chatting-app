import { Dialog, TextField, Button, Toolbar } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../Context/RoomProvider";

export default function JoinMeeting({ open, close }) {
  const { ws } = useContext(RoomContext);

  const joinRoom = () => {
    ws.emit("join-room");
  };

  return (
    <Dialog open={open} onClose={close}>
      <Toolbar sx={{ flexDirection: "column", p: 3, gap: 3 }}>
        <TextField label="Meeting code" />
        <Button onClick={joinRoom} variant="contained">
          Submit
        </Button>
      </Toolbar>
    </Dialog>
  );
}
