import { FC, ReactNode } from "react";
import { Box, Grid, Card } from "@mui/material";

interface ILayout {
  form?: ReactNode;
  list?: ReactNode;
}

const Layout: FC<ILayout> = ({ form, list }) => {
  return (
    <Box padding="20px">
      <Grid container spacing={4}>
        <Grid item xs={12} md={5} lg={4} xl={3.5}>
          <Card>
            <Box padding="20px">{form}</Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={7} lg={8} xl={8.5}>
          <Card>
            <Box padding="10px">{list}</Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
