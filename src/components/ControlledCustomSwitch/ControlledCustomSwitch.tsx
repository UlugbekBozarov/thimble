import { FC, Fragment } from "react";
import {
  Controller,
  useFormContext,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { FormControlLabel, FormControlLabelProps } from "@mui/material";

import Error from "../Error/Error";
import CustomSwitch from "../CustomSwitch/CustomSwitch";

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

const ControlledCustomSwitch: FC<IControlled<FormControlLabelProps>> = ({
  labelPlacement = "start",
  name,
  rules,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Fragment>
          <FormControlLabel
            // label={
            //   <Label
            //     htmlFor={name}
            //     required={rules?.required}
            //     isTranslation={!!translationKey}
            //   >
            //     {translationKey || label}
            //   </Label>
            // }
            labelPlacement={labelPlacement}
            {...props}
            {...field}
            inputRef={ref}
            value={field?.value || false}
            checked={field?.value || false}
            control={<CustomSwitch id={name} />}
          />
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledCustomSwitch;
