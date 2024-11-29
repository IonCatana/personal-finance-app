import React from "react";
import { Button, Box } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

/**
 * ButtonTertiary
 * -------------------------------
 * Questo componente rappresenta un pulsante terziario, usato per azioni secondarie o di supporto.
 * Include la possibilità di navigare verso un'altra pagina tramite `react-router-dom` o
 * eseguire una funzione personalizzata tramite `onClick`.
 *
 * Props:
 * - children (node, obbligatoria): Contenuto del pulsante (es. testo o icona+testo).
 * - withIcon (bool, opzionale): Aggiunge un'icona freccia accanto al testo se impostato a `true`.
 * - to (string, opzionale): Percorso per la navigazione utilizzando `react-router-dom`.
 * - sx (object, opzionale): Stili personalizzati per il pulsante.
 * - ...props (object): Altre proprietà che vengono passate al componente Button di Material-UI.
 *
 * Uso:
 * - Ideale per link o pulsanti secondari che richiedono navigazione o azioni leggere.
 * - Può essere utilizzato con o senza icona aggiuntiva.
 *
 * Esempio:
 * <ButtonTertiary to="/details" withIcon>
 *   See Details
 * </ButtonTertiary>
 */
const ButtonTertiary = ({ children, withIcon, to, sx = {}, ...props }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  /**
   * Gestisce il clic sul pulsante:
   * - Se è definito `to`, naviga verso il percorso specificato.
   * - Altrimenti, esegue la funzione passata tramite `onClick`.
   */
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        typography: "textPreset4",
        color: theme.palette.grey[500],
        textTransform: "none",
        padding: `${pxToRem(0)}`,
        boxShadow: "none",
        backgroundColor: "transparent",
        "&:hover": {
          boxShadow: "none",
          color: theme.palette.grey[900],
        },
        ...sx, // Consente la personalizzazione degli stili
      }}
      {...props} // Passa ulteriori props al componente Button
    >
      {children}

      {/* Icona opzionale aggiunta accanto al contenuto */}
      {withIcon && (
        <Box
          sx={{
            marginLeft: pxToRem(12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: pxToRem(12),
            height: pxToRem(12),
          }}>
          <svg
            fill={theme.palette.grey[500]}
            height={pxToRem(8)}
            viewBox="0 0 6 11"
            width={pxToRem(6)}
            xmlns="http://www.w3.org/2000/svg"
            style={{ transition: "fill 0.4s ease" }}>
            <path
              d="m.853506.146465 5.000004 5.000005c.04648.04643.08336.10158.10853.16228.02516.06069.03811.12576.03811.19147 0 .0657-.01295.13077-.03811.19147-.02517.06069-.06205.11584-.10853.16228l-5.000004 5.00003c-.069927.07-.159054.1177-.256097.137-.097042.0193-.197637.0094-.289048-.0285-.091412-.0378-.16953-.102-.2244652-.1843-.0549354-.0823-.08421767-.179-.08413981-.278l-.00000043-9.999984c-.00007788-.098949.02920444-.195695.08413984-.277992.0549356-.082297.1330536-.1464431.2244646-.1843193.091412-.03787611.192007-.04777907.289049-.02845381.097042.01932521.186169.06700801.256097.13701411z"
              style={{
                fill: "currentColor",
              }}
            />
          </svg>
        </Box>
      )}
    </Button>
  );
};

ButtonTertiary.propTypes = {
  children: PropTypes.node.isRequired, // Contenuto del pulsante (testo o icona+testo)
  withIcon: PropTypes.bool, // Aggiunge un'icona freccia accanto al testo (opzionale)
  to: PropTypes.string, // Percorso per la navigazione (opzionale)
  sx: PropTypes.object, // Stili personalizzati opzionali
};

export default ButtonTertiary;
