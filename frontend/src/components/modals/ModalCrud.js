import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, TextField, MenuItem } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ButtonDestroy from "@components/buttons/ButtonDestroy";
import ButtonTertiary from "@components/buttons/ButtonTertiary";
import { ReactComponent as CloseModal } from "@assets/images/icon-close-modal.svg";
import BasicInput from "@components/inputFields/BasicInput";

const ModalCrud = ({ open, onClose, type, data, onSubmit }) => {
  const theme = useTheme();

  const isDelete = type === "delete";
  const isEdit = type === "edit";
  const isAdd = type === "add";

  // Funzione per gestire il submit
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(data);
    }
    onClose();
  };

  const renderTitle = () => {
    if (isAdd) return "Add New Pot";
    if (isEdit) return `Edit ${data?.name} Pot`;
    if (isDelete) return `Delete ${data?.name}?`;
  };

  const renderContent = () => {
    if (isDelete) {
      return (
        <Typography
          sx={{
            typography: theme.typography.textPreset4,
            color: theme.palette.grey[500],
            marginBottom: pxToRem(20),
          }}>
          Are you sure you want to delete this pot? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </Typography>
      );
    }

    return (
      <>
        <BasicInput
          fullWidth
          label="Pot Name"
          infoText="X characters left"
          placeholder="e.g. Rainy Days"
          defaultValue={data?.name || ""}
          sx={{ marginBottom: pxToRem(16) }}
        />
        <BasicInput
          fullWidth
          label="Target"
          prefix="$"
          placeholder="e.g. 2000"
          defaultValue={data?.target || ""}
          sx={{ marginBottom: pxToRem(16) }}
        />
        <TextField
          fullWidth
          label="Theme"
          select
          defaultValue={data?.theme || "Green"}
          sx={{ marginBottom: pxToRem(16) }}>
          <MenuItem value="Green">Green</MenuItem>
          <MenuItem value="Blue">Blue</MenuItem>
          <MenuItem value="Red">Red</MenuItem>
        </TextField>
      </>
    );
  };

  const renderActions = () => {
    if (isDelete) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: pxToRem(20),
            width: "100%",
          }}>
          <ButtonDestroy onClick={handleSubmit}>
            Yes, Confirm Deletion
          </ButtonDestroy>
          <ButtonTertiary onClick={onClose}>No, Go Back</ButtonTertiary>
        </Box>
      );
    }

    return (
      <ButtonDestroy onClick={handleSubmit} sx={{ flex: 1 }}>
        {isAdd ? "Add Pot" : "Save Changes"}
      </ButtonDestroy>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: theme.palette.otherColors.white,
          maxWidth: pxToRem(560),
          width: "100%",
          margin: "auto",
          borderRadius: pxToRem(12),
          padding: {
            xs: `${pxToRem(24)} ${pxToRem(20)}`,
            sm: `${pxToRem(32)}`,
            md: `${pxToRem(32)}`,
          },
          boxShadow: theme.shadows[5],
        }}>
        {/* Titolo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: pxToRem(20),
          }}>
          <Typography
            sx={{
              typography: theme.typography.textPreset1,
              color: theme.palette.grey[900],
            }}>
            {renderTitle()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: pxToRem(32),
              height: pxToRem(32),
            }}>
            <CloseModal style={{ cursor: "pointer" }} onClick={onClose} />
          </Box>
        </Box>

        {/* Contenuto dinamico */}
        {renderContent()}

        {/* Azioni */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: pxToRem(24),
          }}>
          {renderActions()}
        </Box>
      </Box>
    </Modal>
  );
};

ModalCrud.propTypes = {
  open: PropTypes.bool.isRequired, // Stato di apertura della modale
  onClose: PropTypes.func.isRequired, // Funzione per chiudere la modale
  type: PropTypes.oneOf(["add", "edit", "delete"]).isRequired, // Tipo di modale
  data: PropTypes.object, // Dati da mostrare nella modale
  onSubmit: PropTypes.func, // Funzione per gestire il salvataggio o la conferma
};

export default ModalCrud;
