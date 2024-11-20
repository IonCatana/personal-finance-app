import React from "react";
import { Popover, List, ListItemButton, ListItemText } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const ActionPopover = ({ actions, anchorEl, onClose }) => {
  const theme = useTheme();
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      <List
        sx={{
          borderRadius: pxToRem(8),
          padding: `${pxToRem(0)} `,
          boxShadow: `${pxToRem(8)} ${pxToRem(8)} ${pxToRem(16)} ${pxToRem(
            0
          )} ${theme.palette.grey[900]}`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            width: `calc(100% - ${pxToRem(40)})`,
            height: pxToRem(1),
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: theme.palette.grey[100],
          },
        }}>
        {actions.map((action, index) => (
          <ListItemButton
            sx={{
              padding: `${pxToRem(0)}`,
            }}
            key={index}
            onClick={() => {
              action.onClick();
              onClose(); // Chiude il popover dopo il clic
            }}>
            <ListItemText
              sx={{
                typography: "textPreset4",
                color: theme.palette.grey[900],
                padding: `${pxToRem(12)} ${pxToRem(0)}`,
                margin: `${pxToRem(0)} ${pxToRem(20)}`,
              }}
              primary={action.label}
              primaryTypographyProps={{
                style: {
                  color: action.color || theme.palette.grey[900],
                  typography: "textPreset4",
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Popover>
  );
};

export default ActionPopover;
