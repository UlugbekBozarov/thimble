import React, { FC, Fragment } from "react";
import {
  Controller,
  useFormContext,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Box, Button, TextField, TextFieldProps, styled } from "@mui/material";
import { get } from "lodash";

import Error from "../Error/Error";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    paddingRight: 0,
  },
});

type IControlled<T> = T & {
  label?: string;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  onChange?: (value?: string, oldValue?: string) => void;
};

const ControlledNumberInput: FC<IControlled<TextFieldProps>> = ({
  name,
  rules,
  onChange,
  ...props
}) => {
  const { control } = useFormContext();

  const inputChangeHandler =
    (formChangeHandler: (...event: any[]) => void, value?: string) =>
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      formChangeHandler(get(event, "target.value", ""));
      if (onChange) {
        onChange(get(event, "target.value", ""), value);
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange, value, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <StyledTextField
            id={name}
            fullWidth
            {...props}
            {...field}
            type="number"
            inputRef={ref}
            error={!!error}
            value={value || ""}
            onChange={inputChangeHandler(onChange, value)}
            // InputProps={{
            //   endAdornment: (
            //     <Box height="56px" display="flex">
            //       <Button>g</Button>
            //       <Button>d</Button>
            //     </Box>
            //   ),
            // }}
          />
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledNumberInput;
