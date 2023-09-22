import { FC, Fragment } from "react";
import {
  Controller,
  useFormContext,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Select, SelectChangeEvent, SelectProps } from "@mui/material";
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

const ControlledSelect: FC<IControlled<SelectProps>> = ({
  name,
  rules,
  onChange,
  ...props
}) => {
  const { control } = useFormContext();

  const selectChangeHandler =
    (formChangeHandler: (...event: any[]) => void, value?: string) =>
    (event: SelectChangeEvent<any>) => {
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
          <Select
            id={name}
            fullWidth
            {...props}
            {...field}
            inputRef={ref}
            error={!!error}
            value={value || ""}
            onChange={selectChangeHandler(onChange, value)}
          />
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledSelect;
