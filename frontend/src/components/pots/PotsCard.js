import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ButtonSecondary from "@components/buttons/ButtonSecondary";
import { ReactComponent as EllipsisIcon } from "@assets/images/icon-ellipsis.svg";
import ActionPopover from "@components/actions/ActionPopover";
import ModalCrud from "@components/modals/ModalCrud";

/**
 * PotsCard Component
 * -------------------------------
 * Questo componente rappresenta una card visuale per mostrare dettagli relativi a un "pot" (fondo o obiettivo di risparmio).
 *
 * Funzionalità principali:
 * - Mostra il nome del pot, il totale risparmiato, il target e la percentuale raggiunta.
 * - Include una barra di progresso che riflette visivamente la percentuale di completamento.
 * - Fornisce pulsanti per aggiungere denaro o prelevarlo.
 * - Supporta un'azione cliccabile sul menu "ellipsis".
 *
 * Props:
 * - `name`: Nome del pot (stringa obbligatoria).
 * - `total`: Totale risparmiato (numero obbligatorio).
 * - `target`: Obiettivo di risparmio (numero obbligatorio).
 * - `percentage`: Percentuale di completamento calcolata (numero obbligatorio).
 * - `color`: Colore per identificare visivamente il pot (stringa obbligatoria).
 * - `onAddMoney`: Funzione eseguita quando si clicca su "+ Add Money".
 * - `onWithdraw`: Funzione eseguita quando si clicca su "Withdraw".
 *
 * Esempio di utilizzo:
 * ```jsx
 * <PotsCard
 *   name="New Laptop"
 *   total={100}
 *   target={1000}
 *   percentage={10}
 *   color="#F2CDAC"
 *   onAddMoney={() => console.log("Add Money")}
 *   onWithdraw={() => console.log("Withdraw Money")}
 * />
 * ```
 */
const PotsCard = ({
  name,
  total,
  target,
  percentage,
  color,
  onAddMoney,
  onWithdraw,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null); // Stato per gestire il popover
  const [modalOpen, setModalOpen] = useState(false); // Stato per gestire la visibilità della modale
  const [modalType, setModalType] = useState(""); // Tipo di modale: "edit" o "delete"
  const [modalData, setModalData] = useState(null); // Dati da passare alla modale

  // Funzione per aprire il popover
  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalData({ name, total, target, color }); // Passa i dati correnti del pot
    setModalOpen(true);
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

        {/* Sezione pulsanti */}
        <Box sx={{ display: "flex", gap: pxToRem(16) }}>
          {/* Pulsante per aggiungere denaro */}
          <ButtonSecondary sx={{ flex: 1 }} onClick={onAddMoney}>
            + Add Money
          </ButtonSecondary>
          {/* Pulsante per prelevare denaro */}
          <ButtonSecondary sx={{ flex: 1 }} onClick={onWithdraw}>
            Withdraw
          </ButtonSecondary>
        </Box>
      </Box>
      <ModalCrud
        open={modalOpen}
        onClose={handleCloseModal}
        type={modalType} // "edit" o "delete"
        data={modalData} // Passa i dati del pot
        onSubmit={(updatedData) => {
          console.log("Data submitted:", updatedData); // Gestisci il salvataggio o eliminazione
          handleCloseModal();
        }}
      />
    </>
  );
};

PotsCard.propTypes = {
  name: PropTypes.string.isRequired, // Nome del pot
  total: PropTypes.number.isRequired, // Totale risparmiato
  target: PropTypes.number.isRequired, // Obiettivo di risparmio
  percentage: PropTypes.number.isRequired, // Percentuale di completamento
  color: PropTypes.string.isRequired, // Colore del pot
  onAddMoney: PropTypes.func.isRequired, // Funzione per aggiungere denaro
  onWithdraw: PropTypes.func.isRequired, // Funzione per prelevare denaro
};

export default PotsCard;
