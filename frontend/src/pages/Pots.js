import React from "react";
// import { Box } from "@mui/material";
// import { pxToRem } from "@utils/pxToRem";
// import { useTheme } from "@mui/material/styles";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";

const PotsContent = () => {
  // const theme = useTheme();

  return (
    <SectionHeaderContent
      title="Pots"
      buttonLabel="+ Add New Pot"
      onButtonClick={() => console.log("Add New Pot clicked!")}
      buttonComponent={ButtonPrimary}
    />
  );
};

export default PotsContent;
