import { FC, Fragment } from "react";
import {
  Controller,
  useFormContext,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

import Error from "../Error/Error";

type IControlled<T> = T & {
  label: string;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;

  onChange?: (
    checked: boolean,
    event: React.SyntheticEvent<Element, Event>
  ) => void;
};

interface ICheckbox {
  labelPlacement: "top" | "bottom" | "end" | "start";
}

const ControlledCheckbox: FC<IControlled<ICheckbox>> = ({
  labelPlacement = "start",
  name,
  rules,
  onChange,
  ...props
}) => {
  const { control } = useFormContext();

  const inputChangeHandler =
    (formChangeHandler: (...event: any[]) => void) =>
    (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
      formChangeHandler(event);
      if (onChange) {
        onChange(checked, event);
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
          <FormControlLabel
            labelPlacement={labelPlacement}
            {...props}
            {...field}
            inputRef={ref}
            checked={value || false}
            onChange={inputChangeHandler(onChange)}
            control={<Checkbox id={name} color="success" />}
          />
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledCheckbox;
