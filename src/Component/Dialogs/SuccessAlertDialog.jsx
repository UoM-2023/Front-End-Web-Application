import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function SuccessAlertDialog({
  handleClose,
  handleReset,
  message,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOkClick = () => {
    handleClose();
    handleReset(); // Call the handleReset function to clear the form
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{message}</DialogTitle>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleOkClick}
          autoFocus
          style={{
            borderColor: "green",
            borderWidth: "0.05rem",
            color: "black",
            fontSize: "0.9rem",
            padding: "5px 8px",
            borderRadius: "5px",
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
