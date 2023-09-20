import { Switch, styled } from "@mui/material";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: "58px",
  height: "40px",
  padding: "8px",
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    background: "rgb(226, 226, 226)",
    opacity: "1 !important",
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 14 14"><path fill="black" d="M10.9082 10.092C11.1415 10.3253 11.1415 10.6753 10.9082 10.9087C10.7915 11.0253 10.6748 11.0837 10.4998 11.0837C10.3248 11.0837 10.2082 11.0253 10.0915 10.9087L6.99984 7.81699L3.90817 10.9087C3.7915 11.0253 3.67484 11.0837 3.49984 11.0837C3.32484 11.0837 3.20817 11.0253 3.0915 10.9087C2.85817 10.6753 2.85817 10.3253 3.0915 10.092L6.18317 7.00033L3.0915 3.90866C2.85817 3.67533 2.85817 3.32533 3.0915 3.09199C3.32484 2.85866 3.67484 2.85866 3.90817 3.09199L6.99984 6.18366L10.0915 3.09199C10.3248 2.85866 10.6748 2.85866 10.9082 3.09199C11.1415 3.32533 11.1415 3.67533 10.9082 3.90866L7.8165 7.00033L10.9082 10.092Z" /></svg>')`,
      right: 12,
    },
  },
  "& .Mui-checked": {
    transform: "translateX(18px) !important",
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 14,
    height: 14,
    margin: 4,
    // background: theme?.palette?.white?.main,
  },
}));
