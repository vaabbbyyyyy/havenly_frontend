import React from "react";
import "./index.css";
import Router from "./routers/Router";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { Button } from "@mui/material";

function App() {
  const snackbarProvider = React.useRef();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        ref={snackbarProvider}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        maxSnack={3}
        action={(snackbarId) => (
          <Button
            size="small"
            color="inherit"
            onClick={() => snackbarProvider.current.closeSnackbar(snackbarId)}
          >
            Dismiss
          </Button>
        )}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
