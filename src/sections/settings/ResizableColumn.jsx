import { useEffect } from "react";
import { IconButton, styled } from "@mui/material";

import { Close } from "components/icons";

const StyledColumns = styled("div")(({ isDragging, width }) => ({
  width: width && `${width}px`,
  position: "relative",
  minWidth: "80px",
  height: "100%",
  minHeight: "50px",
  display: "inline-flex",
  border: "1px solid #e9e9e9",
  borderRadius: "12px",
  background: "white",
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
}));

const ResizableColumn = ({
  id,
  children,
  onChange,
  index,
  onClear,
  ...props
}) => {
  useEffect(() => {
    const element = document.getElementById(`resizable-column-${id}`);

    let startX, startWidth;

    function initDrag(e) {
      startX = e.clientX;
      startWidth = parseInt(
        document.defaultView.getComputedStyle(element).width,
        10
      );
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }

    function doDrag(e) {
      const width = startWidth + e.clientX - startX;
      element.style.width = width + "px";
      onChange(width);
    }

    function stopDrag(e) {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }

    const resizer = document.getElementById(`resizer-${id}`);
    resizer.addEventListener("mousedown", initDrag, false);

    return () => {
      resizer.removeEventListener("mousedown", initDrag, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <StyledColumns id={`resizable-column-${id}`} {...props}>
      {children}
      <div id={`resizer-${id}`} className="resizer" />
      <IconButton
        className="close-icon-button"
        onClick={onClear}
        color="error"
        sx={{ width: "24px", height: "24px", padding: "5px" }}
      >
        <Close color="white" />
      </IconButton>
    </StyledColumns>
  );
};

export default ResizableColumn;
