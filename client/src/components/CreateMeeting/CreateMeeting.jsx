import { Dialog, TextField, Button, Toolbar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function CreateMeeting({ open, close }) {
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
        <Button variant="contained">Submit</Button>
      </Toolbar>
    </Dialog>
  );
}
