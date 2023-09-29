import React, { Fragment, useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { debounce, get, isEmpty } from "lodash";

import { removeItemLocalStorage, setItemLocalStorage } from "services/storage";
import { AppContext } from "context";

import {
  ColumnContent,
  StableCardColumn,
  StyledCustomColumn,
  StyledPlaceholder,
  Title,
} from "./TableSettings.style";
import ResizableColumn from "./ResizableColumn";

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

const TableSettings = () => {
  const {
    state: { columnsData },
    actions: { setRoute, setColumnsData },
  } = useContext<any>(AppContext);

  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const [placeholderProps, setPlaceholderProps] = useState<any>({});

  const [data, setData] = useState<ITableData>(structuredClone(columnsData));

  const reorder = (
    list: Array<ITableColumn>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderQuoteMap = (quoteMap: any, source: any, destination: any) => {
    const current = [...quoteMap[source.droppableId]];
    const next = [...quoteMap[destination.droppableId]];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(current, source.index, destination.index);
      const result = {
        ...quoteMap,
        [source.droppableId]: reordered,
      };
      return result;
    }

    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
      ...quoteMap,
      [source.droppableId]: current,
      [destination.droppableId]: next,
      totalWidth:
        get(quoteMap, "totalWidth", 0) +
        (get(source, "droppableId") === "availableColumns"
          ? -get(target, "width", 100)
          : get(target, "width", 100)),
    };

    return result;
  };

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const handleDragStart = (result: any) => {
    if (!result.source) {
      return;
    }
    const draggedDOM: any = getDraggedDom(result.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight } = draggedDOM;
    const sourceDroppableId: "availableColumns" | "extraColumns" =
      result?.source?.droppableId;
    const sourceIndex = result?.source?.index;
    let clientX: any =
      data[sourceDroppableId].slice(0, sourceIndex).reduce((total, curr) => {
        return total + curr.width + 10;
      }, 0) + 84;

    setPlaceholderProps({
      clientHeight,
      clientWidth: data?.[sourceDroppableId]?.[result?.source?.index]?.width,
      clientY: 0,
      clientX: clientX,
    });
  };

  const handleDragUpdate = (result: any) => {
    if (!result.destination) {
      return;
    }

    const draggedDOM: any = getDraggedDom(result.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight } = draggedDOM;
    const destinationDroppableId: "availableColumns" | "extraColumns" =
      result?.destination?.droppableId;
    const sourceDroppableId: "availableColumns" | "extraColumns" =
      result?.source?.droppableId;
    const destinationIndex = result?.destination?.index;
    const sourceIndex = result?.source?.index;

    let clientX =
      data?.[destinationDroppableId]
        .slice(
          0,
          destinationIndex +
            (result?.destination?.index - result?.source?.index > 0 &&
            sourceDroppableId !== "extraColumns"
              ? 1
              : 0)
        )
        .reduce((total: number, curr: any, index) => {
          if (index !== sourceIndex || sourceDroppableId === "extraColumns") {
            return total + curr.width + 10;
          } else return total;
        }, 0) + 84;

    setPlaceholderProps({
      clientHeight,
      clientWidth:
        sourceDroppableId === "extraColumns"
          ? 250
          : data?.[destinationDroppableId]?.[sourceIndex]?.width,
      clientY: 10,
      clientX: clientX - (sourceDroppableId === "extraColumns" ? 5 : 0),
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newData = reorderQuoteMap(data, source, destination);
    setData(newData);

    const draggedDOM: any = getDraggedDom(result.draggableId);
    const destinationIndex = result.destination.index;

    if (!draggedDOM) {
      return;
    }

    const { clientHeight } = draggedDOM;

    let clientX =
      newData?.[destination?.droppableId]
        .slice(0, destinationIndex)
        .reduce((total: number, curr: any) => {
          return total + curr.width + 10;
        }, 0) + 84;
    setPlaceholderProps({
      clientHeight,
      clientWidth:
        newData?.[result?.destination?.droppableId]?.[
          result?.destination?.index
        ]?.width,
      clientY: 10,
      clientX: clientX,
    });
  };

  const handleAddedColumns = (columnKey: string) => () => {
    setData((item) => {
      const colIndex = item.extraColumns.findIndex(
        (col) => col?.key === columnKey
      );
      const columns = item.extraColumns.splice(colIndex, 1);
      item.availableColumns.push(...columns);
      return {
        ...item,
        totalWidth: get(item, "totalWidth", 0) + get(columns, "width", 100),
      };
    });
  };

  const handleClearColumn = (columnKey: string) => () => {
    setData((item) => {
      let colIndex: number = -1;
      const totalWidth = item.availableColumns.reduce((total, col, index) => {
        if (col?.key !== columnKey) {
          return total + get(col, "width") + 10;
        } else {
          colIndex = index;
          return total;
        }
      }, 0);
      const columns = item.availableColumns.splice(colIndex, 1);
      item.extraColumns.push(...columns);
      return { ...item, totalWidth };
    });
  };

  const handleResizableColumn = (columnKey: string) =>
    debounce((width: number) => {
      setData((item) => {
        let colIndex: number = -1;
        const totalWidth = item.availableColumns.reduce((total, col, index) => {
          if (col?.key !== columnKey) {
            return total + get(col, "width") + 10;
          } else {
            colIndex = index;
            return total;
          }
        }, 0);
        item.availableColumns[colIndex].width = Math.max(width, 80);
        return {
          ...item,
          totalWidth: totalWidth + width + 84,
        };
      });
    }, 100);

  const submitHandler = () => {
    setItemLocalStorage("TableColumns", data);
    setColumnsData(data);
    setRoute("");
    removeItemLocalStorage("Route");
  };

  return (
    <div>
      <Box mb="20px">
        <Stack direction="row" spacing={2}>
          <Button
            size="large"
            variant="outlined"
            color="success"
            onClick={() => {
              setRoute("");
              removeItemLocalStorage("Route");
            }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={submitHandler}
          >
            Save
          </Button>
        </Stack>
      </Box>
      <Card>
        <Box p="30px">
          <Box>
            <DragDropContext
              onDragEnd={onDragEnd}
              onDragStart={handleDragStart}
              onDragUpdate={handleDragUpdate}
            >
              <Droppable droppableId="board">
                {() => (
                  <Box width="100%">
                    <Box mb="10px">
                      <Box pb="20px" sx={{ borderBottom: "1px solid #f5f5f5" }}>
                        <Typography variant="h5" fontWeight={500}>
                          Settings fields
                        </Typography>
                      </Box>
                    </Box>
                    <Box minHeight="100px" mb="20px" p="10px 0px">
                      <Droppable
                        type="COLUMN"
                        direction="horizontal"
                        droppableId="availableColumns"
                      >
                        {(provided: any, snapshot) => (
                          <Box
                            position="relative"
                            height="100%"
                            sx={{ overflowX: "auto" }}
                            borderRadius="12px"
                            padding="10px 0"
                          >
                            <Box
                              width={
                                get(data, "totalWidth") &&
                                `${get(data, "totalWidth")}px`
                              }
                              minWidth="100%"
                              paddingBottom="10px"
                              display="inline-flex"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <StyledCustomColumn>
                                <Typography fontWeight="bold">№</Typography>
                              </StyledCustomColumn>
                              {get(data, "availableColumns", [])?.map(
                                (item, index) => (
                                  <Draggable
                                    draggableId={get(item, "key")}
                                    index={index}
                                    key={get(item, "key")}
                                  >
                                    {(itemProvided, itemSnapshot) => (
                                      <Fragment>
                                        <Box
                                          ref={itemProvided.innerRef}
                                          {...itemProvided.draggableProps}
                                        >
                                          <ResizableColumn
                                            id={get(item, "key")}
                                            index={index}
                                            isDragging={itemSnapshot.isDragging}
                                            onChange={handleResizableColumn(
                                              get(item, "key")
                                            )}
                                            onClear={handleClearColumn(
                                              get(item, "key")
                                            )}
                                            width={get(item, "width", 80)}
                                          >
                                            <ColumnContent
                                              {...itemProvided.dragHandleProps}
                                            >
                                              <Title
                                                aria-label={`name quote list`}
                                              >
                                                {get(item, "header")}
                                              </Title>
                                            </ColumnContent>
                                          </ResizableColumn>
                                        </Box>
                                      </Fragment>
                                    )}
                                  </Draggable>
                                )
                              )}
                            </Box>
                            {/* {provided.placeholder} */}
                            {!isEmpty(placeholderProps) &&
                              snapshot.isDraggingOver && (
                                <StyledPlaceholder
                                  left={placeholderProps.clientX}
                                  height={placeholderProps.clientHeight}
                                  width={placeholderProps.clientWidth}
                                />
                              )}
                          </Box>
                        )}
                      </Droppable>
                    </Box>
                    <Box mb="10px">
                      <Box pb="20px" sx={{ borderBottom: "1px solid #f5f5f5" }}>
                        <Typography variant="h5" fontWeight={500}>
                          Additional fields
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Droppable
                        type="COLUMN"
                        direction="horizontal"
                        droppableId="extraColumns"
                      >
                        {(provided: any, snapshot) => (
                          <Box
                            width="100%"
                            height="100%"
                            minHeight="70px"
                            display="inline-flex"
                            flexWrap="wrap"
                            gap="10px"
                            border={
                              snapshot.isDraggingOver
                                ? "1px dashed #2e7d32"
                                : "1px dashed #d9d9d9"
                            }
                            borderRadius="12px"
                            padding="10px"
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {get(data, "extraColumns", [])?.map(
                              (item, index) => (
                                <Draggable
                                  draggableId={get(item, "key")}
                                  index={index}
                                  key={get(item, "key")}
                                >
                                  {(itemProvided, itemSnapshot) => (
                                    <Box
                                      ref={itemProvided.innerRef}
                                      {...itemProvided.draggableProps}
                                      {...itemProvided.dragHandleProps}
                                    >
                                      <StableCardColumn
                                        onClick={handleAddedColumns(
                                          get(item, "key")
                                        )}
                                        isDragging={itemSnapshot.isDragging}
                                      >
                                        <ColumnContent>
                                          <Title aria-label={`name quote list`}>
                                            {get(item, "header")}
                                          </Title>
                                        </ColumnContent>
                                      </StableCardColumn>
                                    </Box>
                                  )}
                                </Draggable>
                              )
                            )}
                          </Box>
                        )}
                      </Droppable>
                    </Box>
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default TableSettings;
