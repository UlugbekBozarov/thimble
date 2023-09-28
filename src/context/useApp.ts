import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { get } from "lodash";

import { getItemLocalStorage, setItemLocalStorage } from "../services/storage";

type IData = {
  id: string;
  name: string;
  age: number;
  subscription: String;
  employment: boolean;
};

interface ITableColumn {
  type: "string" | "number";
  key: string;
  header?: string;
  width: number;
}

interface ITableData {
  availableColumns: Array<ITableColumn>;
  extraColumns: Array<ITableColumn>;
}

const InitialTableData = {
  availableColumns: [
    {
      type: "string",
      key: "name",
      header: "Name",
      width: 400,
    },
    {
      type: "number",
      key: "age",
      header: "Age",
      width: 100,
    },
    {
      type: "string",
      key: "subscription",
      header: "Subscription",
      width: 250,
    },
    {
      type: "string",
      key: "employment",
      header: "Employment",
      width: 250,
    },
  ],
  extraColumns: [],
  totalWidth: 1084,
};

const useApp = () => {
  const formStore = useForm<IData>({
    defaultValues: {
      name: "",
      subscription: "Subscribed",
      employment: false,
    },
  });

  const { watch, reset, handleSubmit, setFocus } = formStore;

  const [columnsData, setColumnsData] = useState(
    getItemLocalStorage("TableColumns") || InitialTableData
  );
  const [route, setRoute] = useState<"settings" | undefined>(
    getItemLocalStorage("Route")
  );
  const [mode, setMode] = useState<"light" | "dark">(
    getItemLocalStorage("Mode") || "light"
  );
  const [filter, setFilter] = useState({
    page: 0,
    limit: 20,
    search: "",
  });
  const [data, setData] = useState<Array<IData>>(
    getItemLocalStorage("Items") || []
  );

  const searchedData = useMemo(() => {
    const filteredData = get(filter, "search", "")
      ? data?.filter((item) => {
          return `${get(item, "name", "")} ${get(item, "age", "")} ${get(
            item,
            "subscription",
            ""
          )} ${get(item, "employment", false) ? "Employment" : "Unemployment"}`
            .toLocaleLowerCase()
            .includes(get(filter, "search", "").toLocaleLowerCase());
        })
      : data;

    return filteredData;
  }, [data, filter]);

  const handleChangeMode = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    const newMode = checked ? "dark" : "light";
    setItemLocalStorage("Mode", newMode);
    setMode(newMode);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      page: 0,
      search: get(event, "target.value"),
    }));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilter((prev) => ({
      ...prev,
      page: 0,
      limit: +get(event, "target.value", 20),
    }));
  };

  const handleTableRowClick = (item: IData) => () => {
    setFocus("name");
    reset(item);
  };

  const handleCancel = () => {
    reset({
      name: "",
      subscription: "Subscribed",
      employment: false,
    });
  };

  const handleDelete = () => {
    setData((prev) => [
      ...prev?.filter((item) => get(item, "id") !== watch("id")),
    ]);
    reset({
      name: "",
      subscription: "Subscribed",
      employment: false,
    });
  };

  const submitHandler = handleSubmit((data) => {
    setData((prev: Array<IData>) => {
      let newData;
      if (get(data, "id")) {
        const findIndex = prev?.findIndex(
          (item) => get(item, "id") === get(data, "id")
        );
        newData = [...prev];
        newData[findIndex] = {
          id: get(data, "id"),
          name: get(data, "name", "")?.trim(),
          age: +get(data, "age", 0),
          subscription: get(data, "subscription", ""),
          employment: get(data, "employment", false),
        };
      } else {
        newData = [
          {
            id: v4(),
            name: get(data, "name", "")?.trim(),
            age: +get(data, "age", 0),
            subscription: get(data, "subscription", ""),
            employment: get(data, "employment", false),
          },
          ...prev,
        ];
      }
      setItemLocalStorage("Items", newData);
      return newData;
    });
    reset({
      name: "",
      subscription: "Subscribed",
      employment: false,
    });
  });

  return {
    state: { route, mode, formStore, filter, searchedData },
    actions: {
      setRoute,
      handleCancel,
      handleDelete,
      submitHandler,
      handleChangePage,
      handleChangeMode,
      handleChangeSearch,
      handleTableRowClick,
      handleChangeRowsPerPage,
    },
  };
};

export default useApp;
