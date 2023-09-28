import { styled } from "@mui/material";

export const Title = styled("h4")`
  word-break: break-word;
  user-select: none;
  padding: 8px;
  margin: 0;
`;

export const ColumnContent = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  marginRight: "3px",
});

export const StableCardColumn = styled("div")<{ isDragging?: boolean }>(
  ({ isDragging }) => ({
    minHeight: "50px",
    display: "flex",
    width: "250px",
    // justifyContent: "center",
    alignContent: "center",
    border: "1px solid #e9e9e9",
    borderRadius: "12px",
    background: "#e9e9e9",
    padding: "0px 8px",
    paddingRight: "4px",
    boxShadow: `${isDragging ? "0 0 12px 0 rgba(0, 0, 0, 0.08)" : "none"}`,
  })
);

export const StyledPlaceholder = styled("div", {
  shouldForwardProp: (prop: string) =>
    !["width", "height", "left"].includes(prop),
})<{ width?: number; height?: number; left?: number }>(
  ({ theme, width, height, left }) => ({
    left,
    width,
    height,
    position: "absolute",
    top: 10,
    border: "2px dashed #d9d9d9",
    borderRadius: theme?.shape?.borderRadius,
  })
);
