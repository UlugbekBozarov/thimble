import { useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  ControlledCheckbox,
  ControlledInput,
  ControlledNumberInput,
  ControlledSelect,
  LabeledModeSwitch,
} from "../../components";
import { AppContext } from "../../context";

const Form = () => {
  const {
    state: { formStore, mode },
    actions: { submitHandler, handleCancel, handleDelete, handleChangeMode },
  } = useContext<any>(AppContext);

  const { watch } = formStore;

  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight="bold" variant="h6">
              Insert Row
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledInput
              label="Name"
              name="name"
              rules={{
                validate: (value) => {
                  if (value?.trim()?.length === 0) {
                    return "Please enter name";
                  } else if (value?.trim()?.length < 3) {
                    return "Must be at least 3 characters";
                  } else if (value?.trim()?.length > 200) {
                    return "No more than 200 characters";
                  } else return true;
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
            <ControlledCheckbox
              label="Employment"
              name="employment"
              labelPlacement="end"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Insert
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <LabeledModeSwitch
              label="Mode"
              checked={mode === "dark" ? true : false}
              onChange={handleChangeMode}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="success"
              size="large"
              disabled={!watch("id")}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              disabled={!watch("id")}
              onClick={handleDelete}
            >
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
