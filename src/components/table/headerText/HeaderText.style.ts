import { Typography, styled } from "@mui/material";

export const StyledHeaderTypography = styled(Typography)({
  overflow: "hidden",
  whiteSpace: "initial",
  wordWrap: "break-word",
  fontWeight: 600,
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});
