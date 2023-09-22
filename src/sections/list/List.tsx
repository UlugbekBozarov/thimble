import { useContext } from "react";
import {
  Box,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { get } from "lodash";

import { NoRows, Search } from "components/icons";

import { AppContext } from "../../context";
import { StyledGridOverlay } from "./List.style";

const List = () => {
  const {
    state: { formStore, searchedData, filter },
    actions: {
      handleChangeSearch,
      handleTableRowClick,
      handleChangePage,
      handleChangeRowsPerPage,
    },
  } = useContext<any>(AppContext);

  const { watch } = formStore;

  return (
    <div>
      <Box mt="10px" mb="20px" ml="20px">
        <Input
          placeholder="Search..."
          color="success"
          onChange={handleChangeSearch}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </Box>
      <Box height="calc(100vh - 175px)" overflow="auto">
        <Table
          stickyHeader
          sx={{ height: get(searchedData, "length", 0) ? undefined : "100%" }}
        >
          <TableHead>
            <TableRow>
              <TableCell width="70px">№</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Subscription</TableCell>
              <TableCell>Employment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: "100%" }}>
            {get(searchedData, "length", 0) ? (
              searchedData
                .slice(
                  get(filter, "page", 0) * get(filter, "limit", 20),
                  (get(filter, "page", 0) + 1) * get(filter, "limit", 20)
                )
                ?.map((item: any, index: number) => (
                  <TableRow
                    hover
                    selected={watch("id") === get(item, "id")}
                    onClick={handleTableRowClick(item)}
                    sx={{ height: "56px" }}
                    key={get(item, "id")}
                  >
                    <TableCell>
                      {get(filter, "page", 0) * get(filter, "limit", 20) +
                        index +
                        1}
                    </TableCell>
                    <TableCell>{get(item, "name")}</TableCell>
                    <TableCell>{get(item, "age")}</TableCell>
                    <TableCell>{get(item, "subscription")}</TableCell>
                    <TableCell>
                      {get(item, "employment", false)
                        ? "Employment"
                        : "Unemployment"}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow sx={{ height: "100%" }}>
                <TableCell colSpan={5}>
                  <StyledGridOverlay>
                    <NoRows />
                    <Typography mt="7px">No data</Typography>
                  </StyledGridOverlay>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Box mt="10px">
        <TablePagination
          component="div"
          count={get(searchedData, "length", 0)}
          page={get(filter, "page")}
          onPageChange={handleChangePage}
          rowsPerPage={get(filter, "limit", 20)}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};

export default List;
