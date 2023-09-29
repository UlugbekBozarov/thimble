export type ITableColumn = {
  type: "string" | "number";
  key: string;
  header?: string;
  width: number;
};

export type ITableData = {
  availableColumns: Array<ITableColumn>;
  extraColumns: Array<ITableColumn>;
};
