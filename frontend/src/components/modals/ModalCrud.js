import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CloseIcon } from "@assets/images/icon-close-modal.svg";
import Snackbar from "@components/snackbar/SnackBar";
import ModalAdd from "@components/modals/ModalAdd";
import ModalEdit from "@components/modals/ModalEdit";
import ModalDelete from "@components/modals/ModalDelete";
import ModalAddMoney from "@components/modals/ModalAddMoney";
import ModalAddBudget from "@components/modals/ModalAddBudget";
import ModalWithdraw from "@components/modals/ModalWithdraw";

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
  const isAddBudget = useMemo(() => type === "addBudget", [type]);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    label: "",
    severity: "info", // 'success', 'error', 'warning', 'info'
  });

  // Funzione chiamata quando cambia il valore
  const handleColorChange = (newSelection) => {
    setSelectedColor(newSelection.value); // Aggiorna lo stato con il valore selezionato
  };

  const handleCategoryChange = (newSelection) => {
    setSelectedCategory(newSelection.value); // Aggiorna lo stato con il valore selezionato
  };

  const handleSnackbarOpen = (label, severity = "info") => {
    setSnackbar({ open: true, label, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderTitle = useMemo(() => {
    if (isAdd) return "Add New Pot";
    if (isEdit) return `Edit '${data?.name}' Pot`;
    if (isDelete) return `Delete '${data?.name}?'`;
    if (isAddMoney) return `Add to '${data?.name}'`;
    if (isWithdraw) return `Withdraw from '${data?.name}'`;
    if (isAddBudget) return "Add Budget";
  }, [isAdd, isEdit, isDelete, isAddMoney, isWithdraw, isAddBudget, data]);

  const renderContent = useMemo(() => {
    if (!type) {
      return (
        <Typography>
          No modal type provided. Please configure the modal appropriately.
        </Typography>
      );
    }

    if (isAddBudget) {
      return (
        <ModalAddBudget
          data={data || {}}
          options={options || []}
          selectedColor={selectedColor}
          selectedCategory={selectedCategory}
          onColorChange={handleColorChange}
          onCategoryChange={handleCategoryChange}
          onSubmit={(newData) => {
            onSubmit(newData);
            handleSnackbarOpen("Budget added successfully!", "success");
          }}
          buttonLabel="Add Budget"
        />
      );
    }

    if (isAdd) {
      return (
        <ModalAdd
          data={data || {}} // Dati vuoti per un nuovo pot
          options={options || []} // Colori o altre opzioni
          selectedColor={selectedColor} // Colore scelto
          onColorChange={handleColorChange} // Callback per aggiornare il colore
          onSubmit={(newData) => {
            onSubmit(newData);
            handleSnackbarOpen("Pot added successfully!", "success");
          }} // Passa i dati raccolti al genitore
          buttonLabel="Add Pot"
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
            handleSnackbarOpen("Pot updated successfully!", "success");
          }}
          buttonLabel="Save Changes"
        />
      );
    }

    if (isDelete && data) {
      return (
        <ModalDelete
          data={data}
          onSubmit={() => {
            handleSnackbarOpen("Pot deleted successfully!", "success");
            // Ritarda la chiusura della modale per permettere allo Snackbar di mostrarsi
            setTimeout(() => {
              onSubmit(data);
              onClose();
            }, 3000); // Mostra lo Snackbar per 3 secondi
          }}
          onCancel={onClose}
        />
      );
    }

    if (isAddMoney && data) {
      return (
        <ModalAddMoney
          data={data}
          onSubmit={(updatedData) => {
            onSubmit(updatedData);
            handleSnackbarOpen("Money added successfully!", "success");
          }}
          onCancel={onClose} // Chiudi la modale senza modifiche
        />
      );
    }

    if (isWithdraw && data) {
      return (
        <ModalWithdraw
          data={data}
          onSubmit={(updatedData) => {
            onSubmit({ ...updatedData, _id: data._id });
            handleSnackbarOpen("Money withdrawn successfully!", "success");
          }}
        />
      );
    }

    return <Typography>Invalid modal type provided</Typography>;
  }, [
    type,
    data,
    options,
    onClose,
    selectedColor,
    selectedCategory,
    isAdd,
    isEdit,
    isDelete,
    isAddMoney,
    isWithdraw,
    isAddBudget,
    onSubmit,
  ]);

  return (
    <>
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
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        label={snackbar.label}
        severity={snackbar.severity}
      />
    </>
  );
};

ModalCrud.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    "add",
    "edit",
    "delete",
    "addMoney",
    "withdraw",
    "addBudget",
  ]),
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array,
};

export default ModalCrud;
