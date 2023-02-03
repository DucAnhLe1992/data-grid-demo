import { useState, useEffect } from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { Column } from "react-data-grid";

import { getComparator } from "../../utils/helpers";
import { Row } from "../../utils/types";
import "./index.css";

interface SortingFieldProps {
  sortOptions: Column<Row>[];
  rows: Row[];
  setSortedRows: (args: () => Row[]) => void;
}

const SortingField = ({
  sortOptions,
  rows,
  setSortedRows,
}: SortingFieldProps) => {
  const [sortColumn, setSortColumn] = useState<string>("api");
  const [sortOrder, setSortOrder] = useState<string>("none");

  useEffect(() => {
    setSortedRows(() => {
      return [...rows].sort((a, b) => {
        const comparator = getComparator(sortColumn);
        const compResult = comparator(a, b);
        return sortOrder === "ASC"
          ? compResult
          : sortOrder === "DESC"
          ? -compResult
          : 0;
      });
    });
  }, [setSortedRows, rows, sortColumn, sortOrder]);

  return (
    <div className="sort-section">
      <FormControl
        className="sort-column"
        variant="standard"
        sx={{ m: 1, minWidth: 50 }}
      >
        <InputLabel>Sort by</InputLabel>
        <Select
          title="Select a column to sort by"
          value={sortColumn}
          onChange={(event) => setSortColumn(event.target.value)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.key as string} value={option.key as string}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        className="sort-order"
        variant="standard"
        sx={{ m: 1, minWidth: 50 }}
      >
        <InputLabel>Order by</InputLabel>
        <Select
          title="Select the order to sort with"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          {["none", "ASC", "DESC"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SortingField;
