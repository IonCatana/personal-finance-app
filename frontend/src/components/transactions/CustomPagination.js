import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const CustomPagination = ({ page, totalPages, handleChangePage }) => {
  const theme = useTheme();

  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  let pagesToRender;
  const lastPage = totalPages - 1;

  if (!smallScreen || totalPages <= 3) {
    pagesToRender = Array.from({ length: totalPages }, (_, index) => index);
  } else {
    if (page <= 1) {
      // Inizio
      pagesToRender = [0, 1, "...", lastPage];
    } else if (page >= lastPage - 1) {
      // Fine
      pagesToRender = [0, "...", lastPage - 1, lastPage];
    } else {
      // Mezzo
      pagesToRender = [0, "...", page, "...", lastPage];
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: pxToRem(48),
        backgroundColor: theme.palette.background.paper,
      }}>
      {/* Pulsante "Prev" */}
      <Button
        onClick={() => handleChangePage(null, page - 1)}
        disabled={page === 0}
        sx={{
          textTransform: "none",
          height: pxToRem(40),
          color: theme.palette.grey[900],
          border: `1px solid ${theme.palette.beige[500]}`,
          padding: `${pxToRem(9.5)} ${pxToRem(16)}`,
          minWidth: "unset",
          width: { xs: pxToRem(48), sm: "auto" },
          borderRadius: pxToRem(8),
          transition: "all ease-in-out 0.3s",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.beige[500],
            color: theme.palette.otherColors.white,
          },
          "&:hover svg path": {
            fill: theme.palette.otherColors.white,
            transition: "all ease-in-out 0.3s",
          },
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: pxToRem(16),
          }}>
          <Box
            sx={{
              width: pxToRem(16),
              height: pxToRem(16),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transaction: "all ease-in-out 0.3s",
              "& svg path": {
                transition: "all ease-in-out 0.3s",
              },
            }}>
            <svg
              fill="none"
              height="11"
              viewBox="0 0 6 11"
              width="6"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m5.14656 10.8535-5.000005-4.99997c-.046488-.04643-.0833676-.10158-.1085298-.16228-.0251623-.06069-.03811269-.12576-.0381127-.19147 0-.0657.0129504-.13077.0381126-.19147.0251623-.06069.0620419-.11584.1085299-.16228l4.999995-4.999997c.06993-.0700052.15906-.117689.2561-.13701419.09704-.01932521.19764-.0094229.28905.02845329.09141.0378763.16953.1020229.22447.1843199.05493.082297.08421.179044.08414.277991v10.000017c.00007.0989-.02921.1957-.08414.278-.05494.0823-.13306.1464-.22447.1843s-.19201.0478-.28905.0284c-.09704-.0193-.18617-.067-.25609-.137z"
                fill="#696868"
              />
            </svg>
          </Box>
          <Typography
            sx={{
              typography: "textPreset4",
              display: { xs: "none", sm: "block" },
            }}>
            Prev
          </Typography>
        </Box>
      </Button>
      {/* Numeri di pagina */}
      <Box
        sx={{
          display: "flex",
          gap: pxToRem(8),
        }}>
        {pagesToRender.map((p, index) => (
          <Box
            key={index}
            onClick={() => p !== "..." && handleChangePage(null, p)} // Nessun cambio pagina se è ellissi
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: p === "..." ? "default" : "pointer",
              minWidth: pxToRem(40),
              height: pxToRem(40),
              borderRadius: pxToRem(8),
              typography: "textPreset4",
              backgroundColor:
                p === page ? theme.palette.grey[900] : "transparent",
              color: p === page ? theme.palette.common.white : "inherit",
              border: `1px solid ${theme.palette.beige[500]}`,
              transition: "all ease-in-out 0.3s",
              "&:hover": {
                backgroundColor:
                  p === page || p === "..."
                    ? theme.palette.grey[900]
                    : theme.palette.beige[500],
                color:
                  p === "..." ? "inherit" : theme.palette.otherColors.white,
              },
              borderColor:
                p === page ? theme.palette.grey[900] : theme.palette.beige[500],
            }}>
            {p === "..." ? "..." : p + 1}
          </Box>
        ))}
      </Box>
      {/* Pulsante "Next" */}
      <Button
        onClick={() => handleChangePage(null, page + 1)}
        disabled={page === totalPages - 1}
        sx={{
          textTransform: "none",
          height: pxToRem(40),
          color: theme.palette.grey[900],
          border: `1px solid ${theme.palette.beige[500]}`,
          padding: `${pxToRem(9.5)} ${pxToRem(16)}`,
          borderRadius: pxToRem(8),
          minWidth: "unset",
          width: { xs: pxToRem(48), sm: "auto" },
          transition: "all ease-in-out 0.3s",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.beige[500],
            color: theme.palette.otherColors.white,
          },
          "&:hover svg path": {
            fill: theme.palette.otherColors.white,
            transition: "all ease-in-out 0.3s",
          },
        }}>
        <Box
          width="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: pxToRem(16),
          }}>
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
              typography: "textPreset4",
            }}>
            Next
          </Typography>
          <Box
            sx={{
              width: pxToRem(16),
              height: pxToRem(16),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transaction: "all ease-in-out 0.3s",
              "& svg path": {
                transition: "all ease-in-out 0.3s",
              },
            }}>
            <svg
              fill="none"
              height="11"
              viewBox="0 0 6 11"
              width="6"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m.853506.146465 5.000004 5.000005c.04648.04643.08336.10158.10853.16228.02516.06069.03811.12576.03811.19147 0 .0657-.01295.13077-.03811.19147-.02517.06069-.06205.11584-.10853.16228l-5.000004 5.00003c-.069927.07-.159054.1177-.256097.137-.097042.0193-.197637.0094-.289048-.0285-.091412-.0378-.16953-.102-.2244652-.1843-.0549354-.0823-.08421767-.179-.08413981-.278l-.00000043-9.999984c-.00007788-.098949.02920444-.195695.08413984-.277992.0549356-.082297.1330536-.1464431.2244646-.1843193.091412-.03787611.192007-.04777907.289049-.02845381.097042.01932521.186169.06700801.256097.13701411z"
                fill="#696868"
              />
            </svg>
          </Box>
        </Box>
      </Button>
    </Box>
  );
};

export default CustomPagination;
