import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ModalCrud from "@components/modals/ModalCrud";
import ButtonTertiary from "@components/buttons/ButtonTertiary";
import { useNavigate } from "react-router-dom";
import { useToken } from "@context/TokenContext";

const SectionHeaderContent = ({
  title,
  buttonLabel,
  onButtonClick,
  buttonComponent: ButtonComponent,
  onAddItem,
  modalType,
  showLogout,
  onLogout,
}) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { saveToken } = useToken();

  // Stato per gestire la visibilità della modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funzioni per aprire e chiudere la modale
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    saveToken(null); // Rimuove il token
    navigate("/signin"); // Reindirizza alla pagina di login
  };

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

        {/* Pulsante di logout */}
        {showLogout && (
          <ButtonTertiary withIcon onClick={handleLogout}>
            Logout
          </ButtonTertiary>
        )}
      </Box>
      {/* Modale CRUD per "Add" */}
      <ModalCrud
        open={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
        data={null}
        onSubmit={(newPotData) => {
          onAddItem(newPotData);
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
  onAddItem: PropTypes.func,
  modalType: PropTypes.oneOf(["add", "addBudget"]),
};

export default SectionHeaderContent;
