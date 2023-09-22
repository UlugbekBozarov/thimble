import { useContext, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { ThemeProvider, createTheme } from "@mui/material";

import Layout from "./layout/Layout";
import { Form, List } from "./sections";
import { AppContext } from "./context";

function App() {
  const {
    state: { mode, formStore },
  } = useContext<any>(AppContext);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
        shape: { borderRadius: 12 },
        components: {
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
        <Layout form={<Form />} list={<List />} />
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;
