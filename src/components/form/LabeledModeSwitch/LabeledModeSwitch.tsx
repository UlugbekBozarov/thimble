import React, { FC } from "react";
import { FormControlLabel } from "@mui/material";

import { ModeSwitch } from "../ModeSwitch/ModeSwitch.style";

interface IModeSwitch {
  label: string;
  labelPlacement?: "top" | "bottom" | "end" | "start";
  checked: boolean | undefined;
  onChange?:
    | ((event: React.SyntheticEvent<Element, Event>, checked: boolean) => void)
    | undefined;
}

const LabeledModeSwitch: FC<IModeSwitch> = ({
  checked,
  labelPlacement,
  ...props
}) => {
  return (
    <FormControlLabel
      labelPlacement={labelPlacement || "end"}
      checked={checked || false}
      {...props}
      control={<ModeSwitch color="success" />}
    />
  );
};

export default LabeledModeSwitch;
