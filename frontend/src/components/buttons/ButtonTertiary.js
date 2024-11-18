import React from "react";
import { Button, Box } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ButtonTertiary = ({ children, withIcon, to, sx = {}, ...props }) => {
  const theme = useTheme();
  const navigate = useNavigate();

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
        backgroundColor: theme.palette.otherColors.white,
        "&:hover": {
          boxShadow: "none",
          color: theme.palette.grey[900],
        },

        ...sx, // Permette di aggiungere stile personalizzato
      }}
      {...props} // Passa qualsiasi altra prop
    >
      {children}
      {withIcon && (
        <Box
          component="span"
          sx={{
            marginLeft: pxToRem(12),
            display: "inline-flex",
            alignItems: "center",
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
  children: PropTypes.node.isRequired,
  withIcon: PropTypes.bool,
  to: PropTypes.string,
  sx: PropTypes.object,
};

export default ButtonTertiary;
