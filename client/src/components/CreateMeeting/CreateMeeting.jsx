import { Dialog, TextField, Button, Toolbar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useContext } from "react";
import { RoomContext } from "../Context/RoomProvider";

export default function CreateMeeting({ open, close }) {
  const { ws } = useContext(RoomContext);

  const createRoom = () => {
    ws.emit("create-room");
  };

  return (
    <Dialog open={open} onClose={close}>
      <Toolbar sx={{ flexDirection: "column", py: 3, gap: 2 }}>
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Select date" />
          <TimePicker label="AM / PM" ampm />
        </LocalizationProvider>
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
