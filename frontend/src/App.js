import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  // CssBaseline
} from "@mui/material";
import theme from "./theme";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <nav>
          <Link to="/">Dashboard</Link> |<Link to="/signin">Sign In</Link> |
          <Link to="/signup">Sign Up</Link>
        </nav>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
