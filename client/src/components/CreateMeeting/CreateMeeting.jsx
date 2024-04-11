import { Dialog, TextField, Button, Toolbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../Context/RoomProvider";
import { UserContext } from "../Context/UserContext";

export default function CreateMeeting({ open, close, roomId }) {
  const [title, setTitle] = useState("");
  const [partcipant, setPartcipant] = useState("");
  const { ws } = useContext(RoomContext);
  console.log("received", roomId);

  const { email, name: username } = useContext(UserContext);

  const createRoom = async () => {
    if (!title || !partcipant) {
      return alert("Enter valid title and email");
    }

    let emailData = {
      sender: email,
      recipient: partcipant,
      username: username,
      roomId: roomId,
    };

    console.log(process.env.REACT_APP_SERVER_URL);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}sendEmailToRecipient`,
        {
          method: "POST",
          body: JSON.stringify({ emailData }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("Failed to post data");
        return;
      }
    } catch (error) {
      console.log("Failed to post data", error);
      return;
    }

    // ws.emit("create-room");
  };

  return (
    <Dialog open={open} onClose={close}>
      <Toolbar sx={{ flexDirection: "column", py: 3, gap: 2 }}>
        <TextField
          placeholder="Title"
          variant="standard"
          sx={{ width: "100%" }}
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type="partcipant"
          placeholder="Add participant"
          variant="standard"
          sx={{ width: "100%" }}
          value={partcipant}
          onChange={(e) => setPartcipant(e.target.value)}
          required
        />
        <Button
          sx={{
            bgcolor: "rgb(42,42,54)",
            "&:hover": {
              background: "rgb(56,56,80)",
            },
          }}
          onClick={createRoom}
          variant="contained"
        >
          Submit
        </Button>
      </Toolbar>
    </Dialog>
  );
}
