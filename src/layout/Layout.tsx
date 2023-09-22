import { FC, ReactNode } from "react";
import { Box, Grid, Card, styled } from "@mui/material";

const StyledContent = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  overflowY: "auto",
  padding: "20px",
  background: theme?.palette?.background?.default,
}));

interface ILayout {
  form?: ReactNode;
  list?: ReactNode;
}

const Layout: FC<ILayout> = ({ form, list }) => {
  return (
    <StyledContent>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5} lg={4} xl={3.5}>
          <Card>
            <Box padding="20px">{form}</Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={7} lg={8} xl={8.5}>
          <Card>
            <Box height="calc(100vh - 40px)" padding="10px">
              {list}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </StyledContent>
  );
};

export default Layout;
