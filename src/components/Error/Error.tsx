import { FC } from "react";
import { FieldError } from "react-hook-form";
import { Card, Typography } from "@mui/material";

interface IError {
  error: FieldError | undefined;
}

const Error: FC<IError> = ({ error }) => {
  return error ? (
    <Typography fontSize="13px" color="error" ml="10px" mt="6px">
      {error?.message || "Required field"}
    </Typography>
  ) : (
    <></>
  );
};

export default Error;
