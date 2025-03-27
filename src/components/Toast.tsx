import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Snackbar } from "@mui/material";
import React from "react";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      action={
        <>
          <Button color="secondary" size="small" onClick={onClose}>
            UNDO
          </Button>
          <IconButton size="small" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

export default Toast;
