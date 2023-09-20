import { useContext } from "react";
import { Box, Button, Divider, Grid, MenuItem } from "@mui/material";

import {
  ControlledCustomSwitch,
  ControlledInput,
  ControlledNumberInput,
  ControlledSelect,
} from "../../components";
import { AppContext } from "../../context";

const Form = () => {
  const {
    actions: { submitHandler },
  } = useContext<any>(AppContext);

  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ControlledInput
              label="Name"
              name="name"
              rules={{
                required: {
                  value: true,
                  message: "Please enter name",
                },
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
                maxLength: {
                  value: 200,
                  message: "No more than 200 characters",
                },
              }}
              placeholder="Enter name"
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledNumberInput
              label="Age"
              name="age"
              placeholder="Enter age"
              rules={{
                required: {
                  value: true,
                  message: "Please enter age",
                },
                min: {
                  value: 0,
                  message: "Age must be greater than 0",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledSelect name="subscription">
              <MenuItem value="Subscribed">Subscribed</MenuItem>
              <MenuItem value="Not Subscribed">Not Subscribed</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </ControlledSelect>
          </Grid>
          <Grid item xs={12}>
            {/* <ControlledCustomSwitch label="Employment" name="employment" /> */}
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" size="large">
              Insert
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            Switch
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" size="large">
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box></Box>
    </Box>
  );
};

export default Form;
