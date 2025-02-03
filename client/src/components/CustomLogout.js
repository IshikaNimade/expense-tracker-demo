import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";

const CustomLogout = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={handleClickOpen}
        sx={{
          bgcolor: "error.main",
          color: "white",
          "&:hover": {
            bgcolor: "error.dark",
          },
        }}
      >
        Log Out
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
            maxWidth: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle variant="h6" color="secondary">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomLogout;
