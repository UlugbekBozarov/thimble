import { TypographyProps } from "@mui/material";

import { StyledHeaderTypography } from "./CellText.style";

const CellText = (props: TypographyProps) => {
  return <StyledHeaderTypography {...props} />;
};

export default CellText;
