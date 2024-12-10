import React from "react";
import { Popover, List, ListItemButton, ListItemText } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * ActionPopover Component
 *
 * Questo componente è un popover personalizzato che visualizza una lista di azioni cliccabili.
 * È costruito utilizzando i componenti `Popover`, `List`, `ListItemButton`, e `ListItemText` di Material-UI,
 * e integra uno stile personalizzato attraverso `sx` e il tema Material-UI.
 *
 * Props:
 * - `actions` (Array): Un array di oggetti rappresentanti le azioni disponibili nel popover.
 *    Ogni oggetto deve avere le seguenti proprietà:
 *    - `label` (String): Il testo visualizzato per l'azione.
 *    - `onClick` (Function): La funzione chiamata quando l'azione viene cliccata.
 *    - `color` (String) (opzionale): Il colore personalizzato del testo dell'azione.
 * - `anchorEl` (HTMLElement | null): L'elemento a cui il popover è ancorato.
 *    Se `null`, il popover non viene mostrato.
 * - `onClose` (Function): La funzione chiamata quando il popover viene chiuso.
 *
 * Stile Personalizzato:
 * - Il componente utilizza un bordo arrotondato per il popover e uno stile divider nella lista,
 *   ottenuto con l'uso delle pseudo-classi CSS `&::before`.
 * - Utilizza la funzione `pxToRem` per gestire le dimensioni in modo coerente con il design responsivo.
 *
 * Funzionalità:
 * - Mostra un elenco di azioni cliccabili che chiudono automaticamente il popover una volta selezionate.
 * - Supporta la personalizzazione dello stile tramite il tema Material-UI e i parametri passati.
 *
 * Uso Tipico:
 * Utilizzare il componente per fornire un menu di azioni contestuali legato a un elemento specifico nella UI.
 *
 * Esempio:
 * ```
 * const actions = [
 *   { label: "Modifica", onClick: handleEdit },
 *   { label: "Elimina", onClick: handleDelete, color: "red" },
 * ];
 *
 * <ActionPopover
 *   actions={actions}
 *   anchorEl={anchorElement}
 *   onClose={handlePopoverClose}
 * />
 * ```
 */

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
      }}
      sx={{
        borderRadius: pxToRem(12),
      }}>
      <List
        sx={{
          padding: `${pxToRem(0)}`,
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
              onClose();
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
