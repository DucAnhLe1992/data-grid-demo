import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import "./index.css";

interface GroupingFormProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (args: string[]) => void;
}

const GroupingForm = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: GroupingFormProps) => {
  const toggleOption = (option: string, enabled: boolean) => {
    const optionIndex = selectedOptions.indexOf(option);

    if (enabled) {
      if (optionIndex === -1) {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else if (optionIndex !== -1) {
      const selected = [...selectedOptions];
      selected.splice(optionIndex, 1);
      setSelectedOptions(selected);
    }
  };

  return (
    <div>
      <Typography variant="h6" component="div">
        Group by columns
      </Typography>

      <FormGroup
        className="filter-option"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {options.map((option: any) => (
          <FormControlLabel
            key={option}
            label={option}
            control={
              <Checkbox
                checked={selectedOptions.includes(option.toLowerCase())}
                onChange={(event) =>
                  toggleOption(option.toLowerCase(), event.target.checked)
                }
              />
            }
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default GroupingForm;
