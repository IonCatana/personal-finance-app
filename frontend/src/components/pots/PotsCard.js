import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ButtonSecondary from "@components/buttons/ButtonSecondary";
import { ReactComponent as EllipsisIcon } from "@assets/images/icon-ellipsis.svg";
import ActionPopover from "@components/actions/ActionPopover";
import ModalCrud from "@components/modals/ModalCrud";
import { updatePot, deletePot } from "@components/pots/apiPots";

const PotsCard = ({
  _id,
  name,
  total,
  target,
  percentage,
  color,
  token,
  onAddMoney,
  onWithdraw,
  onUpdatePot,
  onDeletePot,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);

  // Funzione per aprire il popover
  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (type) => {
    if (type === "edit" || type === "delete") {
      setModalType(type);
      setModalData({ _id, name, total, target, color });
    }
    setModalOpen(true); // Mostra la modale
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null); // Resetta i dati
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.otherColors.white,
          borderRadius: pxToRem(12),
          padding: pxToRem(24),
          display: "flex",
          flexDirection: "column",
          gap: pxToRem(32),
        }}>
        {/* Header della card */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          {/* Mostro il nome del pot con un cerchio colorato */}
          <Box sx={{ display: "flex", alignItems: "center", gap: pxToRem(16) }}>
            <Box
              sx={{
                width: pxToRem(16),
                height: pxToRem(16),
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            <Typography
              sx={{
                typography: "textPreset2",
                color: theme.palette.grey[900],
              }}>
              {name}
            </Typography>
          </Box>
          {/* Icona del menu ellipsis (cliccabile) */}
          <EllipsisIcon
            onClick={handleOpenPopover}
            style={{ minHeight: pxToRem(24), cursor: "pointer" }}
          />
          {/* Popover con azioni */}
          <ActionPopover
            actions={[
              {
                label: "Edit Pot",
                onClick: () => {
                  handleOpenModal("edit");
                  handleClosePopover(); // Chiudi il popover dopo il clic
                },
              },
              {
                label: "Delete Pot",
                onClick: () => {
                  handleOpenModal("delete");
                  handleClosePopover(); // Chiudi il popover dopo il clic
                },
                color: theme.palette.secondaryColors.red,
              },
            ]}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
          />
        </Box>

        {/* Sezione Total Saved */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: pxToRem(16) }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            {/* Mostro il totale risparmiato */}
            <Typography
              sx={{
                typography: "textPreset4",
                color: theme.palette.grey[500],
              }}>
              Total Saved
            </Typography>
            <Typography
              sx={{
                typography: "textPreset1",
                color: theme.palette.grey[900],
              }}>
              {`$${total}`}
            </Typography>
          </Box>
          {/* Barra di progresso */}
          <Box>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: pxToRem(8),
                borderRadius: pxToRem(4),
                backgroundColor: theme.palette.beige[100],
                "& .MuiLinearProgress-bar": {
                  backgroundColor: color,
                  borderRadius: pxToRem(4),
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: pxToRem(13),
              }}>
              {/* Mostro la percentuale di completamento */}
              <Typography
                sx={{
                  typography: "textPreset5Bold",
                  color: theme.palette.grey[500],
                }}>
                {`${percentage.toFixed(2)}%`}
              </Typography>
              {/* Mostro il target del pot */}
              <Typography
                sx={{
                  typography: "textPreset5",
                  color: theme.palette.grey[500],
                }}>
                {`Target of $${target}`}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: pxToRem(16) }}>
          <ButtonSecondary
            sx={{ flex: 1 }}
            onClick={() => {
              setModalType("addMoney");
              setModalData({ _id, name, total, target, color });
              setModalOpen(true); // Mostra la modale
            }}>
            + Add Money
          </ButtonSecondary>
          <ButtonSecondary
            sx={{ flex: 1 }}
            onClick={() => handleOpenModal("withdraw")}>
            Withdraw
          </ButtonSecondary>
        </Box>
      </Box>
      <ModalCrud
        open={modalOpen}
        onClose={handleCloseModal}
        type={modalType || undefined}
        data={modalData} // Passa i dati del pot
        onSubmit={async (updatedData) => {
          try {
            if (modalType === "edit") {
              const updatedPot = await updatePot(
                modalData._id,
                updatedData,
                token
              );
              onUpdatePot(updatedPot); // Notifica il genitore
            } else if (modalType === "delete") {
              await deletePot(modalData._id, token);
              onDeletePot(modalData._id); // Notifica il genitore
            } else if (modalType === "addMoney") {
              const updatedPot = await updatePot(
                modalData._id,
                updatedData,
                token
              );
              onUpdatePot(updatedPot); // Aggiorna il totale
            }
          } catch (error) {
            console.error("Error in CRUD operation:", error);
          } finally {
            handleCloseModal();
          }
        }}
      />
    </>
  );
};

PotsCard.propTypes = {
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onUpdatePot: PropTypes.func.isRequired,
  onDeletePot: PropTypes.func.isRequired,
  onAddMoney: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
};

export default PotsCard;
