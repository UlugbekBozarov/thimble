import { useContext, useMemo } from "react";
import {
  Box,
  IconButton,
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

import { NoRows, Search, Settings } from "components/icons";
import { setItemLocalStorage } from "services/storage";
import { ITableColumn } from "types/GlobalTypes";

import { AppContext } from "../../context";
import { StyledGridOverlay } from "./List.style";
import { CellText, HeaderText } from "components/table";

const List = () => {
  const {
    state: { formStore, searchedData, filter, columnsData },
    actions: {
      setRoute,
      handleChangeSearch,
      handleTableRowClick,
      handleChangePage,
      handleChangeRowsPerPage,
    },
  } = useContext<any>(AppContext);

  const columns = useMemo(
    () => get(columnsData, "availableColumns", []),
    [columnsData]
  );

  const { watch } = formStore;

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        mt="10px"
        mb="20px"
        ml="20px"
      >
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
        <IconButton
          onClick={() => {
            setRoute("settings");
            setItemLocalStorage("Route", "settings");
          }}
        >
          <Settings />
        </IconButton>
      </Box>
      <Box height="calc(100vh - 180px)" overflow="auto">
        <Table
          stickyHeader
          sx={{ height: get(searchedData, "length", 0) ? undefined : "100%" }}
        >
          <TableHead>
            <TableRow>
              <TableCell width="70px">№</TableCell>
              {columns?.map((column: ITableColumn, index: number) => (
                <TableCell
                  key={get(column, "key")}
                  sx={{
                    width:
                      columns?.length - 1 === index
                        ? "100%"
                        : `${get(column, "width")}px`,
                    maxWidth:
                      columns?.length - 1 === index
                        ? undefined
                        : `${get(column, "width")}px`,
                    minWidth: `${get(column, "width")}px`,
                    "&:hover .new-header-style": {
                      WebkitLineClamp: "inherit",
                    },
                  }}
                >
                  <HeaderText className="new-header-style">
                    {get(column, "header")}
                  </HeaderText>
                </TableCell>
              ))}
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
                    {columns?.map((column: ITableColumn, index: number) => (
                      <TableCell
                        key={get(column, "key")}
                        sx={{
                          width:
                            columns?.length - 1 === index
                              ? "100%"
                              : `${get(column, "width")}px`,
                          maxWidth:
                            columns?.length - 1 === index
                              ? undefined
                              : `${get(column, "width")}px`,
                          minWidth: `${get(column, "width")}px`,
                        }}
                      >
                        <CellText>{get(item, get(column, "key"))}</CellText>
                      </TableCell>
                    ))}
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
