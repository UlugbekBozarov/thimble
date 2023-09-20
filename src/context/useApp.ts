import { useFieldArray, useForm } from "react-hook-form";

const useApp = () => {
  const formStore = useForm();

  const { control, handleSubmit } = formStore;

  const fieldArray = useFieldArray({
    control,
    name: "list",
  });

  const submitHandler = handleSubmit((data) => {
    console.log("Data: ", data);
  });

  return { state: { formStore, fieldArray }, actions: { submitHandler } };
};

export default useApp;
