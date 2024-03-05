import { Dialog, TextField, Button, Toolbar } from "@mui/material";

export default function JoinMeeting({ open, close }) {
  return (
    <Dialog open={open} onClose={close}>
      <Toolbar sx={{ flexDirection: "column", p: 3, gap: 3 }}>
        <TextField label="Meeting code" />
        <Button variant="contained">Submit</Button>
      </Toolbar>
    </Dialog>
  );
}
