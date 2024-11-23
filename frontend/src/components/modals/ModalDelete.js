import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import ButtonTertiary from "@components/buttons/ButtonTertiary";
import ButtonDestroy from "@components/buttons/ButtonDestroy";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const ModalDelete = ({ data, onSubmit, onCancel }) => {
  const theme = useTheme();

  const handleDelete = () => {
    onSubmit(data); // Passa i dati del pot da eliminare
  };

  return (
    <Box>
      <Typography
        sx={{
          typography: theme.typography.textPreset5,
          color: theme.palette.grey[500],
          marginBottom: pxToRem(20),
        }}>
        Are you sure you want to delete this pot? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: pxToRem(20),
        }}>
        <ButtonDestroy fullWidth onClick={handleDelete}>
          Yes, Confirm Deletion
        </ButtonDestroy>
        <ButtonTertiary fullWidth onClick={onCancel}>
          No, Go Back
        </ButtonTertiary>
      </Box>
    </Box>
  );
};

ModalDelete.propTypes = {
  data: PropTypes.object.isRequired, // Dati relativi al pot
  onSubmit: PropTypes.func.isRequired, // Funzione di conferma eliminazione
  onCancel: PropTypes.func.isRequired, // Funzione per annullare l'operazione
};

export default ModalDelete;
