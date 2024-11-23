import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ModalCrud from "@components/modals/ModalCrud";

const SectionHeaderContent = ({
  title,
  buttonLabel,
  onButtonClick,
  buttonComponent: ButtonComponent,
  onAddPot,
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
                handleOpenModal();
                if (onButtonClick) {
                  onButtonClick();
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
        type="add"
        data={null}
        onSubmit={(newPotData) => {
          onAddPot(newPotData);
          handleCloseModal();
        }}
      />
    </>
  );
};

SectionHeaderContent.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonComponent: PropTypes.elementType,
  onAddPot: PropTypes.func,
};

export default SectionHeaderContent;
