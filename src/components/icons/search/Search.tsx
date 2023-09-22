import { useTheme } from "@mui/material";

const Search = () => {
  const theme = useTheme();

  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.66659 14.4999C11.1644 14.4999 13.9999 11.6644 13.9999 8.16659C13.9999 4.66878 11.1644 1.83325 7.66659 1.83325C4.16878 1.83325 1.33325 4.66878 1.33325 8.16659C1.33325 11.6644 4.16878 14.4999 7.66659 14.4999Z"
        stroke={theme.palette.mode === "light" ? "#1C1E23" : "#fff"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M14.6666 15.1666L13.3333 13.8333"
        stroke={theme.palette.mode === "light" ? "#1C1E23" : "#fff"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Search;
