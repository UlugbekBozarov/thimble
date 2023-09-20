import { FC } from "react";
import { SwitchProps } from "@mui/material";

import { StyledSwitch } from "./CustomSwitch.style";

const CustomSwitch: FC<SwitchProps> = ({ ...props }) => {
  return <StyledSwitch {...props} />;
};

export default CustomSwitch;
