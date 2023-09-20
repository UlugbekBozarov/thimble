import React, { FC, Fragment } from "react";
import {
  Controller,
  useFormContext,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { get } from "lodash";

import Error from "../Error/Error";

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

const ControlledInput: FC<IControlled<TextFieldProps>> = ({
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
          <TextField
            id={name}
            fullWidth
            {...props}
            {...field}
            inputRef={ref}
            error={!!error}
            value={value || ""}
            onChange={inputChangeHandler(onChange, value)}
          />
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledInput;
