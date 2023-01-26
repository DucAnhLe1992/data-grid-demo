import { createContext, useState, useMemo } from "react";
import DataGrid, {
  Column,
  SortColumn,
  RowsChangeData,
  textEditor,
} from "react-data-grid";
import { Select, MenuItem, TextField } from "@mui/material";
import "react-data-grid/lib/styles.css";

import { useAppSelector } from "../../redux/hooks";
import { initRows, detailColumns, getComparator } from "../../utils/helpers";
import { Filter, Row, Detail } from "../../utils/types";
import FilterField from "../../components/FilterField";
import SublineDetails from "../../components/SublineDetails";
import RowExpander from "../../components/RowExpander";
import "./index.css";
import {
  AuthEditor,
  CategoryEditor,
  CorsEditor,
  HttpsEditor,
} from "../../components/DropDownEditor";

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
  const data = useAppSelector((state) => state.data.entries);
  const [filters, setFilters] = useState<Filter>(defaultFilters);
  const [rows, setRows] = useState(initRows(data));
  const [filteredRows, setFilteredRows] = useState(rows);
  const [sortedRows, setSortedRows] = useState(filteredRows);
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [editedRows, setEditedRows] = useState(sortedRows);

  console.log(rows, filteredRows, sortedRows, editedRows);

  useMemo(() => {
    setRows(initRows(data));
  }, [data]);

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

  useMemo(() => {
    setSortedRows(() => {
      if (sortColumns.length === 0) return filteredRows;

      return [...filteredRows].sort((a, b) => {
        for (const sort of sortColumns) {
          const comparator = getComparator(sort.columnKey);
          const compResult = comparator(a, b);
          if (compResult !== 0) {
            return sort.direction === "ASC" ? compResult : -compResult;
          }
        }
        return 0;
      });
    });
  }, [filteredRows, sortColumns]);

  const details: Detail[] = useMemo(
    () =>
      rows?.map((row) => ({
        type: "detail",
        ...row,
      })),
    [rows]
  );

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

  const onRowsChange = (rows: Row[], { indexes }: RowsChangeData<Row>) => {
    const row = rows[indexes[0]];
    if (!row.expanded) {
      rows.splice(indexes[0] + 1, 1);
    } else {
      rows.splice(indexes[0] + 1, 0, details[row.id]);
    }
    setSortedRows(rows);
  };

  const columns = useMemo(
    (): Column<Row>[] => [
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
      {
        key: "api",
        name: "API",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement>
            FilterContext={FilterContext}
            {...p}
          >
            {({ filters, ...rest }) => (
              <TextField
                {...rest}
                value={filters.api}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    api: event.target.value,
                  })
                }
              />
            )}
          </FilterField>
        ),
        editable: true,
        editor: textEditor,
      },
      {
        key: "auth",
        name: "Auth",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement>
            FilterContext={FilterContext}
            {...p}
          >
            {({ filters, ...rest }) => (
              <Select
                {...rest}
                value={filters.auth}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    auth: event.target.value,
                  })
                }
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {classifications.auth.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
        editable: true,
        editor: AuthEditor,
      },
      {
        key: "category",
        name: "Category",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement>
            FilterContext={FilterContext}
            {...p}
          >
            {({ filters, ...rest }) => (
              <Select
                {...rest}
                value={filters.category}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    category: event.target.value,
                  })
                }
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {classifications.category.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
        editable: true,
        editor: CategoryEditor,
      },
      {
        key: "cors",
        name: "Cors",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement>
            FilterContext={FilterContext}
            {...p}
          >
            {({ filters, ...rest }) => (
              <Select
                {...rest}
                value={filters.cors}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    cors: event.target.value,
                  })
                }
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {classifications.cors.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
        editable: true,
        editor: CorsEditor,
      },
      {
        key: "description",
        name: "Description",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement>
            FilterContext={FilterContext}
            {...p}
          >
            {({ filters, ...rest }) => (
              <TextField
                {...rest}
                value={filters.description}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    description: event.target.value,
                  })
                }
              />
            )}
          </FilterField>
        ),
        editable: true,
        editor: textEditor,
      },
      {
        key: "https",
        name: "HTTPS",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement>
            FilterContext={FilterContext}
            {...p}
          >
            {({ filters, ...rest }) => (
              <Select
                {...rest}
                value={filters.https}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    https: event.target.value,
                  })
                }
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {classifications.https.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
        editable: true,
        editor: HttpsEditor,
      },
      {
        key: "link",
        name: "Link",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement>
            FilterContext={FilterContext}
            {...p}
          >
            {({ filters, ...rest }) => (
              <TextField
                {...rest}
                value={filters.link}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    link: event.target.value,
                  })
                }
              />
            )}
          </FilterField>
        ),
        editable: true,
        editor: textEditor,
      },
    ],
    [
      classifications.auth,
      classifications.category,
      classifications.cors,
      classifications.https,
      details,
    ]
  );

  return (
    <div className="root">
      <FilterContext.Provider value={filters}>
        <DataGrid
          columns={columns}
          rows={sortedRows}
          defaultColumnOptions={{ resizable: true, sortable: true }}
          onRowsChange={onRowsChange}
          rowHeight={(args) =>
            args.type === "ROW" && args.row.type === "detail" ? 120 : 35
          }
          headerRowHeight={100}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
        />
      </FilterContext.Provider>
    </div>
  );
};

export default Combination;
