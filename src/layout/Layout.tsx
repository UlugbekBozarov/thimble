import { useContext } from "react";
import { Box, Grid, Card, styled } from "@mui/material";

import { Form, List, TableSettings } from "sections";
import { AppContext } from "context";

const StyledContent = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  overflowY: "auto",
  padding: "20px",
  background: theme?.palette?.background?.default,
}));

const Layout = () => {
  const {
    state: { route },
  } = useContext<any>(AppContext);

  return (
    <StyledContent>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5} lg={4} xl={3.5}>
          <Card>
            <Box padding="20px">
              <Form />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={7} lg={8} xl={8.5}>
          {route === "settings" ? (
            <Box>
              <TableSettings />
            </Box>
          ) : (
            <Card>
              <Box height="calc(100vh - 42px)" padding="10px">
                <List />
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </StyledContent>
  );
};

export default Layout;
