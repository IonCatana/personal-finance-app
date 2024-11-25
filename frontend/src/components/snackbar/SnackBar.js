import React from "react";
import PropTypes from "prop-types";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";

const Snackbar = ({
  open,
  onClose,
  label,
  severity = "info", // 'success', 'error', 'warning', 'info'
  duration = 3000,
}) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Modifica posizione se necessario
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {label}
      </Alert>
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired, // Determina se lo snackbar è visibile
  onClose: PropTypes.func.isRequired, // Funzione chiamata alla chiusura
  label: PropTypes.string.isRequired, // Messaggio da mostrare
  severity: PropTypes.oneOf(["success", "error", "warning", "info"]), // Tipo di notifica
  duration: PropTypes.number, // Durata in millisecondi
};

export default Snackbar;
