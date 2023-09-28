import { useContext, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { ThemeProvider, createTheme } from "@mui/material";

import Layout from "./layout/Layout";
import { AppContext } from "./context";

function App() {
  const {
    state: { mode, formStore },
  } = useContext<any>(AppContext);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode as "dark" | "light",
        },
        shape: { borderRadius: 12 },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                border: "1px solid #e9e9e9",
                boxShadow: "none",
                boxSizing: "border-box",
              },
            },
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                "& .MuiTableCell-root": {
                  borderBottom: 0,
                  background: mode === "light" ? "#e3e3e3" : "#121212",
                },
                "& .MuiTableCell-root:first-child": {
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                },
                "& .MuiTableCell-root:last-child": {
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                },
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                "&.MuiTableCell-head": {
                  fontWeight: 600,
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <FormProvider {...formStore}>
        <Layout />
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;
