import React from "react";
// import { Box } from "@mui/material";
// import { pxToRem } from "@utils/pxToRem";
// import { useTheme } from "@mui/material/styles";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";

const BudgetsContent = () => {
  // const theme = useTheme();

  return (
    <SectionHeaderContent
      title="Budgets"
      buttonLabel="+ Add New Budget"
      onButtonClick={() => console.log("Add New Budget clicked!")}
      buttonComponent={ButtonPrimary}
    />
  );
};

export default BudgetsContent;
