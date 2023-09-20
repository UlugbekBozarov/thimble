import { useContext, useMemo } from "react";
import { FormProvider } from "react-hook-form";

import Layout from "./layout/Layout";
import { Form, List } from "./sections";
import { AppContext } from "./context";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
  const {
    state: { formStore },
  } = useContext<any>(AppContext);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          // mode: "dark",
        },
        shape: { borderRadius: 8 },
        components: {
          MuiFormLabel: {
            styleOverrides: {
              root: {
                "& .MuiFormLabel-asterisk": {
                  color: "rgb(252, 7, 7)",
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              select: {
                paddingRight: "32px !important",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                fontSize: "12px",
                padding: "10px",
              },
              footer: {
                color: "rgba(0, 0, 0, 0.87)",
                fontWeight: "bold",
              },
            },
          },
          MuiPaginationItem: {
            styleOverrides: {
              root: {
                fontSize: "0.875rem",
                lineHeight: "0.875rem",
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {},
            },
          },
        },
      }),
    []
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
