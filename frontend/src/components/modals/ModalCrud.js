import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
// import ButtonDestroy from "@components/buttons/ButtonDestroy";
// import ButtonPrimary from "@components/buttons/ButtonPrimary";
// import ButtonTertiary from "@components/buttons/ButtonTertiary";
import { ReactComponent as CloseIcon } from "@assets/images/icon-close-modal.svg";
import ModalAdd from "@components/modals/ModalAdd";
import ModalEdit from "@components/modals/ModalEdit";

const ModalCrud = ({
  open,
  onClose,
  options,
  type = "add",
  data,
  onSubmit,
}) => {
  const theme = useTheme();

  const isDelete = useMemo(() => type === "delete", [type]);
  const isEdit = useMemo(() => type === "edit", [type]);
  const isAdd = useMemo(() => type === "add", [type]);
  const isAddMoney = useMemo(() => type === "addMoney", [type]);
  const isWithdraw = useMemo(() => type === "withdraw", [type]);

  const [selectedColor, setSelectedColor] = useState("");

  // Funzione chiamata quando cambia il valore
  const handleColorChange = (newSelection) => {
    setSelectedColor(newSelection.value); // Aggiorna lo stato con il valore selezionato
  };

  const renderTitle = useMemo(() => {
    if (isAdd) return "Add New Pot";
    if (isEdit) return `Edit ${data?.name} Pot`;
    if (isDelete) return `Delete ${data?.name}?`;
    if (isAddMoney) return `Add to ${data?.name}`;
    if (isWithdraw) return `Withdraw from ${data?.name}`;
  }, [isAdd, isEdit, isDelete, isAddMoney, isWithdraw, data]);

  const renderContent = useMemo(() => {
    if (!type) {
      return (
        <Typography>
          Invalid modal type provided. Please check the configuration.
        </Typography>
      );
    }

    if (isAdd) {
      return (
        <ModalAdd
          data={data || {}} // Dati vuoti per un nuovo pot
          options={options || []} // Colori o altre opzioni
          selectedColor={selectedColor} // Colore scelto
          onColorChange={handleColorChange} // Callback per aggiornare il colore
          onSubmit={onSubmit} // Passa i dati raccolti al genitore
        />
      );
    }

    if (isEdit && data) {
      return (
        <ModalEdit
          data={data}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
          onSubmit={(updatedData) => {
            onSubmit({ ...updatedData, _id: data._id });
          }}
        />
      );
    }
    return <Typography>Invalid modal type provided</Typography>;
  }, [type, data, options, selectedColor, isAdd, isEdit, onSubmit]);

  return (
    <Modal
      sx={{
        margin: pxToRem(16),
      }}
      open={open}
      onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: theme.palette.otherColors.white,
          maxWidth: pxToRem(560),
          width: "100%",
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
              fontSize: pxToRem(20),
              [theme.breakpoints.up("sm")]: {
                fontSize: theme.typography.textPreset1.fontSize,
              },
              [theme.breakpoints.up("md")]: {
                fontSize: theme.typography.textPreset1.fontSize,
              },
              fontWeight: theme.typography.textPreset1.fontWeight,
              lineHeight: theme.typography.textPreset1.lineHeight,
              color: theme.palette.grey[900], // Colore dinamico
            }}>
            {renderTitle}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: pxToRem(32),
              height: pxToRem(32),
            }}>
            <CloseIcon style={{ cursor: "pointer" }} onClick={onClose} />
          </Box>
        </Box>

        {/* Contenuto dinamico */}
        {renderContent}
      </Box>
    </Modal>
  );
};

ModalCrud.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["add", "edit", "delete", "addMoney", "withdraw"]),
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array,
};

export default ModalCrud;
