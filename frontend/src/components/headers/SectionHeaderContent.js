import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ModalCrud from "@components/modals/ModalCrud";

/**
 * SectionHeaderContent
 * -------------------------------
 * Questo componente rappresenta un'intestazione di sezione riutilizzabile
 * che include un titolo e un pulsante opzionale.
 *
 * Funzionalità:
 * - Mostra un titolo principale (obbligatorio).
 * - Visualizza un pulsante opzionale con un'azione personalizzabile.
 * - Consente di passare un componente personalizzato per il pulsante.
 *
 * Props:
 * - title (string, obbligatoria): Testo del titolo visualizzato nella sezione.
 * - buttonLabel (string, opzionale): Testo visualizzato nel pulsante.
 * - onButtonClick (function, opzionale): Funzione eseguita al clic sul pulsante.
 * - buttonComponent (elementType, opzionale): Componente personalizzato per il pulsante.
 *
 * Uso:
 * - Ideale per sezioni con un'intestazione che richiedono un titolo e, opzionalmente, un'azione.
 *
 * Esempio:
 * <SectionHeaderContent
 *   title="Dashboard"
 *   buttonLabel="Add New"
 *   onButtonClick={() => console.log("Azione eseguita")}
 *   buttonComponent={ButtonPrimary}
 * />
 */
const SectionHeaderContent = ({
  title,
  buttonLabel,
  onButtonClick,
  buttonComponent: ButtonComponent,
}) => {
  const theme = useTheme();

  // Stato per gestire la visibilità della modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funzioni per aprire e chiudere la modale
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Box
        sx={{
          minHeight: pxToRem(56),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: pxToRem(32),
        }}>
        {/* Titolo della sezione */}
        <Typography
          sx={{
            typography: "textPreset1",
            color: theme.palette.grey[900],
          }}>
          {title}
        </Typography>

        {/* Pulsante opzionale */}
        {buttonLabel && ButtonComponent && (
          <Box>
            <ButtonComponent
              onClick={() => {
                handleOpenModal(); // Apre la modale al clic
                if (onButtonClick) {
                  onButtonClick(); // Esegue l'eventuale funzione passata
                }
              }}>
              {buttonLabel}
            </ButtonComponent>
          </Box>
        )}
      </Box>
      {/* Modale CRUD per "Add" */}
      <ModalCrud
        open={isModalOpen}
        onClose={handleCloseModal}
        type="add" // Specifica il tipo "add"
        data={null} // Non ci sono dati iniziali per la modalità "add"
        onSubmit={(newData) => {
          console.log("New Pot added:", newData); // Logga i dati ricevuti
          handleCloseModal(); // Chiude la modale
        }}
      />
    </>
  );
};

SectionHeaderContent.propTypes = {
  title: PropTypes.string.isRequired, // Titolo della sezione
  buttonLabel: PropTypes.string, // Testo del pulsante opzionale
  onButtonClick: PropTypes.func, // Funzione chiamata al clic del pulsante
  buttonComponent: PropTypes.elementType, // Componente personalizzato per il pulsante
};

export default SectionHeaderContent;
