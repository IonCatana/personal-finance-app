import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as EllipsisIcon } from "@assets/images/icon-ellipsis.svg";
import ActionPopover from "@components/actions/ActionPopover";

const BudgetHeader = ({ category, maximum, color, onEdit, onDelete }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) =>
    setAnchorEl(event ? event.currentTarget : null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: pxToRem(20),
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: pxToRem(8) }}>
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
            {category}
          </Typography>
        </Box>
        <EllipsisIcon
          onClick={handlePopover}
          style={{ minHeight: pxToRem(24), cursor: "pointer" }}
        />
        <ActionPopover
          actions={[
            { label: "Edit Budget", onClick: onEdit },
            {
              label: "Delete Budget",
              onClick: onDelete,
              color: theme.palette.secondaryColors.red,
            },
          ]}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        />
      </Box>
      <Typography
        sx={{
          marginBottom: pxToRem(16),
          typography: "textPreset4",
          color: theme.palette.grey[500],
        }}>
        Maximum of ${maximum.toFixed(2)}
      </Typography>
    </>
  );
};

BudgetHeader.propTypes = {
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BudgetHeader;
