import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  // CssBaseline
} from "@mui/material";
import { MenuProvider } from "@context/MenuContext";
import theme from "./theme";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <MenuProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
        </BrowserRouter>
      </MenuProvider>
    </ThemeProvider>
  );
}

export default App;
