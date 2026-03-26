import React, { useState } from "react";
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
import ModalEditBudget from "@components/modals/ModalEditBudget";
import ModalDeleteBudget from "@components/modals/ModalDeleteBudget";

const ModalCrud = ({
  open,
  onClose,
  options,
  type = "add",
  data,
  balanceSummary,
  onSubmit,
}) => {
  const theme = useTheme();

  const isDelete = type === "delete";
  const isEdit = type === "edit";
  const isAdd = type === "add";
  const isAddMoney = type === "addMoney";
  const isWithdraw = type === "withdraw";
  const isAddBudget = type === "addBudget";
  const isEditBudget = type === "editBudget";
  const isDeleteBudget = type === "deleteBudget";

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

  const getApiErrorMessage = (error, fallbackMessage) =>
    error?.response?.data?.error || error?.message || fallbackMessage;

  const submitWithFeedback = (action, successMessage, fallbackErrorMessage) => {
    Promise.resolve()
      .then(action)
      .then(() => {
        handleSnackbarOpen(successMessage, "success");
      })
      .catch((error) => {
        handleSnackbarOpen(
          getApiErrorMessage(error, fallbackErrorMessage),
          "error"
        );
      });
  };

  const renderTitle = () => {
    if (isAdd) return "Add New Pot";
    if (isEdit) return `Edit '${data?.name}' Pot`;
    if (isDelete) return `Delete '${data?.name}?'?`;
    if (isAddMoney) return `Add to '${data?.name}'`;
    if (isWithdraw) return `Withdraw from '${data?.name}'`;
    if (isAddBudget) return "Add Budget";
    if (isEditBudget) return `Edit Budget '${data?.category}'`;
    if (isDeleteBudget) return `Delete Budget '${data?.category}'?`;
    return "Manage Item";
  };

  const renderContent = () => {
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
          balanceSummary={balanceSummary}
          selectedColor={selectedColor}
          selectedCategory={selectedCategory}
          onColorChange={handleColorChange}
          onCategoryChange={handleCategoryChange}
          onSubmit={(newData) => {
            submitWithFeedback(
              () => onSubmit(newData),
              "Budget added successfully!",
              "Unable to add the budget."
            );
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
            submitWithFeedback(
              () => onSubmit(newData),
              "Pot added successfully!",
              "Unable to add the pot."
            );
          }} // Passa i dati raccolti al genitore
          buttonLabel="Add Pot"
        />
      );
    }

    if (isEditBudget && data) {
      return (
        <ModalEditBudget
          data={data}
          balanceSummary={balanceSummary}
          selectedColor={selectedColor}
          selectedCategory={selectedCategory}
          onColorChange={handleColorChange}
          onCategoryChange={handleCategoryChange}
          onSubmit={(updatedData) => {
            submitWithFeedback(
              () => onSubmit({ ...updatedData, _id: data._id }),
              "Budget updated successfully!",
              "Unable to update the budget."
            );
          }}
          buttonLabel="Save Changes"
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
            submitWithFeedback(
              () => onSubmit({ ...updatedData, _id: data._id }),
              "Pot updated successfully!",
              "Unable to update the pot."
            );
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
            submitWithFeedback(
              async () => {
                await onSubmit(data);
                onClose();
              },
              "Pot deleted successfully!",
              "Unable to delete the pot."
            );
          }}
          onCancel={onClose}
        />
      );
    }

    if (isDeleteBudget && data) {
      return (
        <ModalDeleteBudget
          data={data}
          onSubmit={() => {
            submitWithFeedback(
              async () => {
                await onSubmit(data);
                onClose();
              },
              "Budget deleted successfully!",
              "Unable to delete the budget."
            );
          }}
          onCancel={onClose}
        />
      );
    }

    if (isAddMoney && data) {
      return (
        <ModalAddMoney
          data={data}
          balanceSummary={balanceSummary}
          onSubmit={(updatedData) => {
            submitWithFeedback(
              () => onSubmit(updatedData),
              "Money added successfully!",
              "Unable to move money into the pot."
            );
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
            submitWithFeedback(
              () => onSubmit({ ...updatedData, _id: data._id }),
              "Money withdrawn successfully!",
              "Unable to withdraw money from the pot."
            );
          }}
        />
      );
    }

    return <Typography>Invalid modal type provided</Typography>;
  };

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
              <CloseIcon style={{ cursor: "pointer" }} onClick={onClose} />
            </Box>
          </Box>

          {/* Contenuto dinamico */}
          {renderContent()}
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
    "editBudget",
    "deleteBudget",
  ]),
  data: PropTypes.object,
  balanceSummary: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array,
};

export default ModalCrud;
