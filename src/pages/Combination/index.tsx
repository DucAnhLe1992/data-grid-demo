import {
  Key,
  createContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import DataGrid, {
  Column,
  RowsChangeData,
  RowRendererProps,
  Row as DataGridRow,
  SelectColumn,
} from "react-data-grid";
import { Select, MenuItem, TextField } from "@mui/material";
import { groupBy } from "lodash";
import "react-data-grid/lib/styles.css";

import { useAppSelector } from "../../redux/hooks";
import {
  initRows,
  detailColumns,
  columnsOptions,
  columns as initialColumns,
} from "../../utils/helpers";
import {
  Filter,
  Row,
  Detail,
  Maybe,
  ContextMenu,
  PaginationType,
  PaginationData,
} from "../../utils/types";
import FilterField from "../../components/FilterField";
import SublineDetails from "../../components/SublineDetails";
import RowExpander from "../../components/RowExpander";
import GroupingForm from "../../components/GroupingForm";
import SavePDF from "../../components/SavePDF";
import SortingField from "../../components/SortingField";
import { useConTextMenu } from "../../utils/hooks";
import ContextMenuComponent from "../../components/ContextMenu";
import SaveCSV from "../../components/SaveCSV";
import "./index.css";
import ColumnSelection from "../../components/ColumnSelection";
import Pagination from "../../components/Pagination";

const FilterContext = createContext<Filter | undefined>(undefined);
const defaultFilters: Filter = {
  api: "",
  auth: "All",
  category: "All",
  cors: "All",
  description: "",
  https: "All",
  link: "",
};

const Combination = () => {
  //load data from app store
  const data = useAppSelector((state) => state.data.entries);
  const [rows, setRows] = useState(initRows(data));

  //raw data then to be filtered
  const [filters, setFilters] = useState<Filter>(defaultFilters);
  const [filteredRows, setFilteredRows] = useState(rows);

  // filtered data then to be sorted
  const [sortedRows, setSortedRows] = useState(filteredRows);

  //sorted data then to be selected
  const [selectedRows, setSelectedRows] = useState<Set<number>>(
    () => new Set()
  );

  //sorted data then to be paginated
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [paginatedRows, setPaginatedRows] = useState<PaginationType>({
    currentRows: sortedRows.slice(0, pageLimit),
    currentPage: 1,
    totalPages: Math.ceil(sortedRows.length / pageLimit),
  });

  //filtered data then also to be grouped
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [expandedGroup, setExpandedGroup] = useState<any>(null);

  //manage right-clicked context menu
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const { clicked, setClicked } = useConTextMenu({
    setContextMenu: setContextMenu,
  });

  //column selection for exporting
  const [columnSelection, setColumnSelection] = useState<string[]>([]);

  //load data everytime the incoming data changes
  useMemo(() => {
    setRows(initRows(data));
  }, [data]);

  //filtering mechanism happens here
  useMemo(() => {
    setFilteredRows(
      rows?.filter((row) => {
        return (
          (filters.api
            ? row.api.toLowerCase().includes(filters.api.toLowerCase())
            : true) &&
          (filters.auth !== "All" ? row.auth === filters.auth : true) &&
          (filters.category !== "All"
            ? row.category === filters.category
            : true) &&
          (filters.cors !== "All" ? row.cors === filters.cors : true) &&
          (filters.description
            ? row.description
                .toLowerCase()
                .includes(filters.description.toLowerCase())
            : true) &&
          (filters.https !== "All" ? row.https === filters.https : true) &&
          (filters.link
            ? row.link.toLowerCase().includes(filters.link.toLowerCase())
            : true)
        );
      })
    );
  }, [rows, filters]);

  //data for the subline section
  const details: Detail[] = useMemo(
    () =>
      rows?.map((row) => ({
        type: "detail",
        ...row,
      })),
    [rows]
  );

  //selection options for some input fields
  //specifically Authentication. Cors, HTTPS, Category
  const classifications = useMemo(() => {
    return rows?.reduce(
      (previous, current) => ({
        auth: previous.auth.includes(current.auth)
          ? previous.auth
          : [...previous.auth, current.auth],
        cors: previous.cors.includes(current.cors)
          ? previous.cors
          : [...previous.cors, current.cors],
        https: previous.https.includes(current.https)
          ? previous.https
          : [...previous.https, current.https],
        category: previous.category.includes(current.category)
          ? previous.category
          : [...previous.category, current.category],
      }),
      {
        auth: [] as string[],
        cors: [] as string[],
        https: [] as string[],
        category: [] as string[],
      }
    );
  }, [rows]);

  //add and remove subline section
  const onRowsChange = (rows: Row[], { indexes }: RowsChangeData<Row>) => {
    const row = rows[indexes[0]];
    if (!row.expanded) {
      rows.splice(indexes[0] + 1, 1);
    } else {
      rows.splice(indexes[0] + 1, 0, details[row.id]);
    }
    setPaginatedRows({
      ...paginatedRows,
      currentRows: rows,
    });
  };

  //paginate the rows so as to allow only certain parts of rows to be shown
  const onPageChanged = (paginationData: PaginationData) => {
    const { currentPage, totalPages, pageLimit } = paginationData;
    const offset = (currentPage - 1) * pageLimit;
    const currentRows = sortedRows.slice(offset, offset + pageLimit);
    setPaginatedRows({ currentRows, currentPage, totalPages });
  };

  useEffect(() => {
    setPaginatedRows({
      currentPage: 1,
      totalPages: Math.ceil(sortedRows.length / pageLimit),
      currentRows: sortedRows.slice(0, pageLimit),
    });
  }, [sortedRows]); // eslint-disable-line react-hooks/exhaustive-deps

  // get the selected rows for exporting
  const getSelectedRows = (selectedRows: Set<number>) =>
    Array.from(selectedRows).map((index: number) =>
      sortedRows.find((row: Row) => row.id === index)
    );

  // define the columns for the data grid, including those that are selected
  const columns = useMemo(
    (): Column<Row>[] => [
      SelectColumn,
      {
        key: "expand",
        name: "",
        minWidth: 30,
        maxWidth: 30,
        colSpan(props) {
          return props.type === "ROW" && props.row.type === "detail"
            ? 8
            : undefined;
        },
        cellClass(row) {
          return row.type === "detail" ? "subline-row" : undefined;
        },
        formatter({ row, isCellSelected, onRowChange }) {
          if (row.type === "detail") {
            return (
              <SublineDetails
                columns={detailColumns}
                rows={[details[row.id]]}
                isRowSelected={isCellSelected}
              />
            );
          }

          return (
            <RowExpander
              row={row}
              isRowSelected={isCellSelected}
              isExpanded={row.expanded || false}
              onRowExpand={() => {
                onRowChange({ ...row, expanded: !row.expanded });
              }}
            />
          );
        },
      },

      ...columnSelection.map((column) => {
        if (["Auth", "Category", "Cors", "HTTPS"].includes(column)) {
          return {
            key: column.toLowerCase(),
            name: column,
            headerCellClass: "filter-element",
            headerRenderer: (p: any) => (
              <FilterField<Row, unknown, HTMLInputElement>
                FilterContext={FilterContext}
                {...p}
              >
                {({ filters, ...rest }) => (
                  <Select
                    {...rest}
                    value={
                      filters[
                        column.toLowerCase() as
                          | "auth"
                          | "category"
                          | "cors"
                          | "https"
                      ]
                    }
                    onChange={(event) =>
                      setFilters({
                        ...filters,
                        [column.toLowerCase()]: event.target.value,
                      })
                    }
                  >
                    <MenuItem key={"All"} value={"All"}>
                      All
                    </MenuItem>
                    {classifications[
                      column.toLowerCase() as
                        | "auth"
                        | "category"
                        | "cors"
                        | "https"
                    ].map((element) => (
                      <MenuItem key={element} value={element}>
                        {element}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FilterField>
            ),
          };
        }
        return {
          key: column.toLowerCase(),
          name: column,
          headerCellClass: "filter-element",
          headerRenderer: (p: any) => (
            <FilterField<Row, unknown, HTMLInputElement>
              FilterContext={FilterContext}
              {...p}
            >
              {({ filters, ...rest }) => (
                <TextField
                  {...rest}
                  value={
                    filters[
                      column.toLowerCase() as "api" | "description" | "link"
                    ]
                  }
                  onChange={(event) =>
                    setFilters({
                      ...filters,
                      [column.toLowerCase()]: event.target.value,
                    })
                  }
                />
              )}
            </FilterField>
          ),
        };
      }),
    ],
    [classifications, details, columnSelection]
  );

  console.log(columns, columnSelection);

  return (
    <div className="root">
      <div className="header">
        <SortingField
          sortOptions={initialColumns}
          rows={filteredRows}
          setSortedRows={setSortedRows}
        />
        <GroupingForm
          options={columnsOptions}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <ColumnSelection
          allColumns={columnsOptions}
          columnSelection={columnSelection}
          setColumnSelection={setColumnSelection}
        />
        <div className="header-save-reports">
          <SaveCSV
            data={getSelectedRows(selectedRows) as Row[]}
            headers={columnSelection}
          />
          <SavePDF
            orientation="l"
            unit="pc"
            size="A4"
            title="API Report"
            headers={columnSelection}
            data={getSelectedRows(selectedRows) as Row[]}
            fileName="PDF-report"
          />
        </div>
      </div>
      <FilterContext.Provider value={filters}>
        <DataGrid
          columns={columns}
          rows={paginatedRows.currentRows}
          groupBy={selectedOptions}
          rowGrouper={groupBy}
          expandedGroupIds={expandedGroup}
          onExpandedGroupIdsChange={setExpandedGroup}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          defaultColumnOptions={{ resizable: true, sortable: true }}
          onRowsChange={onRowsChange}
          rowHeight={(args) =>
            args.type === "ROW" && args.row.type === "detail" ? 120 : 35
          }
          headerRowHeight={100}
          rowKeyGetter={(row) => row.id}
          renderers={{
            //rendering each row with another component which allows right-click
            rowRenderer: ((
              key: Key,
              props: RowRendererProps<typeof DataGridRow, unknown>
            ) => {
              const handleContextMenu = (event: any) => {
                event.preventDefault();
                setClicked(true);
                setContextMenu({
                  rowId: Number.parseInt(key?.toString()),
                  top: event?.clientX,
                  left: event?.clientY,
                });
              };

              return (
                <DataGridRow
                  key={key}
                  onContextMenu={handleContextMenu}
                  {...props}
                />
              );
            }) as unknown as Maybe<
              (key: Key, props: RowRendererProps<Row, unknown>) => ReactNode
            >,
          }}
        />
      </FilterContext.Provider>
      <Pagination
        totalRows={sortedRows.length}
        pageLimit={pageLimit}
        onPageChanged={onPageChanged}
        setPageLimit={setPageLimit}
      />
      {clicked && contextMenu && (
        <ContextMenuComponent
          open={clicked}
          posX={contextMenu.top || 0}
          posY={contextMenu.left || 0}
        />
      )}
    </div>
  );
};

export default Combination;
