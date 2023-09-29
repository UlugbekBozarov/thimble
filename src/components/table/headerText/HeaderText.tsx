import { TypographyProps } from "@mui/material";

import { StyledHeaderTypography } from "./HeaderText.style";

const HeaderText = (props: TypographyProps) => {
  return <StyledHeaderTypography {...props} />;
};

export default HeaderText;
