import {
  FormControlLabel,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

interface ColumnSelectionProps {
  setColumnSelection: (args: string[]) => void;
  columnSelection: string[];
  allColumns: string[];
}

const ColumnSelection = ({
  setColumnSelection,
  columnSelection,
  allColumns,
}: ColumnSelectionProps) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
      <InputLabel>Export columns</InputLabel>
      <Select title="Select columns for export">
        {allColumns.map((element) => (
          <MenuItem key={element}>
            <FormControlLabel
              label={element}
              key={element}
              control={
                <Checkbox
                  checked={columnSelection.includes(element)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setColumnSelection([...columnSelection, element].sort());
                    } else {
                      setColumnSelection(
                        columnSelection
                          .filter((option) => option !== element)
                          .sort()
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
