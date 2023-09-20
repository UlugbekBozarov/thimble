import React, { useContext } from "react";
import { AppContext } from "../../context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { get } from "lodash";

const List = () => {
  const {
    state: { fieldArray },
  } = useContext<any>(AppContext);

  const { fields } = fieldArray;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Subscription</TableCell>
            <TableCell>Employment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields?.map((item: any) => (
            <TableRow key={get(item, "id")}>
              <TableCell>{get(item, "name")}</TableCell>
              <TableCell>{get(item, "age")}</TableCell>
              <TableCell>{get(item, "subscription.name")}</TableCell>
              <TableCell>
                {get(item, "employment", false) ? "Employment" : "Unemployment"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default List;
