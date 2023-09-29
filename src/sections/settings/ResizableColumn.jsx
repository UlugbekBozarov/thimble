import { useEffect } from "react";
import { IconButton } from "@mui/material";

import { Close } from "components/icons";
import { StyledColumns } from "./TableSettings.style";

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
