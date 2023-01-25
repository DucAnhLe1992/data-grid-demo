import React, { useState, createContext, useContext, useMemo } from "react";
import DataGrid, {
  Column,
  HeaderRendererProps,
  useFocusRef,
} from "react-data-grid";
import { TextField, Select, MenuItem } from "@mui/material";

import { Row, Filter } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import "./index.css";

const defaultFilters: Filter = {
  api: "",
  auth: "All",
  category: "All",
  cors: "All",
  description: "",
  https: "All",
  link: "",
};

const FilterContext = createContext<Filter | undefined>(undefined);

const Filtering = () => {
  const data = useAppSelector((state) => state.data.entries);
  const [filters, setFilters] = useState<Filter>(defaultFilters);

  const rows: Row[] = useMemo(
    () =>
      data?.map((row: any, index: number) => ({
        id: index,
        api: row.API,
        auth: row.Auth || "none",
        category: row.Category,
        cors: row.Cors,
        description: row.Description,
        https: row.HTTPS.toString(),
        link: row.Link,
      })),
    [data]
  );

  // selection options for auth filter
  const authSelections = useMemo(
    () => Array.from(new Set(rows?.map((row) => row.auth))).map((auth) => auth),
    [rows]
  );
  // selection options for category filter
  const categorySelections = useMemo(
    () =>
      Array.from(new Set(rows?.map((row) => row.category))).map(
        (category) => category
      ),
    [rows]
  );
  // selection options for cors filter
  const corsSelections = useMemo(
    () => Array.from(new Set(rows?.map((row) => row.cors))).map((cors) => cors),
    [rows]
  );
  // selection options for link filter
  const httpsSelections = useMemo(
    () =>
      Array.from(new Set(rows?.map((row) => row.https))).map((https) => https),
    [rows]
  );

  const filteredRows = useMemo(() => {
    return rows?.filter((row) => {
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
    });
  }, [rows, filters]);

  const columns = useMemo(
    (): Column<Row>[] => [
      {
        key: "api",
        name: "API",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement> {...p}>
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
                className="filter-input"
              />
            )}
          </FilterField>
        ),
      },
      {
        key: "auth",
        name: "Auth",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement> {...p}>
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
                className="filter-input"
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {authSelections.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
      },
      {
        key: "category",
        name: "Category",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement> {...p}>
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
                className="filter-input"
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {categorySelections.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
      },
      {
        key: "cors",
        name: "Cors",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement> {...p}>
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
                className="filter-input"
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {corsSelections.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
      },
      {
        key: "description",
        name: "Description",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement> {...p}>
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
                className="filter-input"
              />
            )}
          </FilterField>
        ),
      },
      {
        key: "https",
        name: "HTTPS",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement> {...p}>
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
                className="filter-input"
              >
                <MenuItem key={"All"} value={"All"}>
                  All
                </MenuItem>
                {httpsSelections.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FilterField>
        ),
      },
      {
        key: "link",
        name: "Link",
        headerCellClass: "filter-element",
        headerRenderer: (p) => (
          <FilterField<Row, unknown, HTMLInputElement> {...p}>
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
                className="filter-input"
              />
            )}
          </FilterField>
        ),
      },
    ],
    [authSelections, categorySelections, corsSelections, httpsSelections]
  );

  return (
    <div className="filter-rows">
      <FilterContext.Provider value={filters}>
        <DataGrid
          columns={columns}
          rows={[
            {
              id: -1,
              ...defaultFilters,
            },
            {
              id: -2,
              ...defaultFilters,
            },
          ].concat(filteredRows)}
          className="data-grid"
        />
      </FilterContext.Provider>
    </div>
  );
};

// this function is to render the filter field component
function FilterField<R, SR, T extends HTMLOrSVGElement>({
  isCellSelected,
  column,
  children,
}: HeaderRendererProps<R, SR> & {
  children: (args: {
    ref: React.RefObject<T>;
    tabIndex: number;
    filters: Filter;
  }) => React.ReactElement;
}) {
  const filters = useContext(FilterContext)!;
  const { ref, tabIndex } = useFocusRef<T>(isCellSelected);

  return (
    <div>
      <div>{column.name}</div>
      <div>{children({ ref, tabIndex, filters })}</div>
    </div>
  );
}

export default Filtering;
