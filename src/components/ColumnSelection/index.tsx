import { useState, useEffect } from "react";
import {
  FormControlLabel,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

interface ColumnSelectionProps {
  setColumnSelection: (args: any) => void;
  columns: string[];
}

const ColumnSelection = ({
  setColumnSelection,
  columns,
}: ColumnSelectionProps) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  useEffect(() => {
    setColumnSelection(selectedColumns);
  }, [selectedColumns, setColumnSelection]);

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
      <InputLabel>Export columns</InputLabel>
      <Select title="Select columns for export">
        {columns.map((element) => (
          <MenuItem key={element}>
            <FormControlLabel
              label={element}
              key={element}
              control={
                <Checkbox
                  checked={selectedColumns.includes(element)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedColumns([...selectedColumns, element]);
                    } else {
                      setSelectedColumns(
                        selectedColumns.filter((option) => option !== element)
                      );
                    }
                  }}
                />
              }
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnSelection;
