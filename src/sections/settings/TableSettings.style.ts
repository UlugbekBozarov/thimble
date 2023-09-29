import { styled } from "@mui/material";

export const StyledCustomColumn = styled("div")(({ theme }) => ({
  width: "74px",
  minWidth: "74px",
  height: "100%",
  minHeight: "50px",
  display: "flex",
  alignItems: "center",
  border: "1px solid #e9e9e9",
  borderRadius: "12px",
  paddingLeft: "15px",
  cursor: "no-drop",
  background: theme?.palette?.background?.default,
}));

export const StyledColumns = styled("div", {
  shouldForwardProp: (prop: string) => !["isDragging", "width"].includes(prop),
})<any>(({ theme, isDragging, width }) => {
  return {
    width: width && `${width}px`,
    position: "relative",
    minWidth: "80px",
    height: "100%",
    minHeight: "50px",
    display: "inline-flex",
    border: "1px solid #e9e9e9",
    borderRadius: "12px",
    background: theme?.palette?.background?.default,
    padding: "0px 8px",
    paddingRight: "4px",
    marginLeft: "10px",
    boxShadow: isDragging && "0 0 12px 0 rgba(0, 0, 0, 0.08)",
    "& .resizer": {
      width: "5px",
      height: "calc(100% - 24px)",
      position: "absolute",
      right: "-3px",
      bottom: "12px",
      cursor: "col-resize",
      borderRadius: "4px",
      background: "#999",
      opacity: 0,
      transition: "all 0.3s easy-in-out",
    },
    "& .close-icon-button": {
      position: "absolute",
      top: "calc(50% - 12px)",
      right: "12px",
      opacity: 0,
      transition: "all 0.3s easy-in-out",
      background: "#999",
      "&:hover": {
        background: "#999",
      },
    },
    "&:hover": {
      "& .resizer": {
        opacity: 1,
        transition: "all 0.3s easy-in-out",
      },
      "& .close-icon-button": {
        opacity: 1,
        transition: "all 0.3s easy-in-out",
      },
    },
  };
});

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
  ({ theme, isDragging }) => ({
    minHeight: "50px",
    display: "flex",
    width: "250px",
    // justifyContent: "center",
    alignContent: "center",
    border: "1px solid #e9e9e9",
    borderRadius: "12px",
    // background: "#e9e9e9",
    padding: "0px 8px",
    paddingRight: "4px",
    boxShadow: `${isDragging ? "0 0 12px 0 rgba(0, 0, 0, 0.08)" : "none"}`,
    background:
      theme?.palette?.mode === "light"
        ? theme?.palette?.grey?.[300]
        : theme?.palette?.action?.hover,
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
