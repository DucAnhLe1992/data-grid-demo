import { Box } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { useFocusRef } from "react-data-grid";

import "./index.css";
import { Row } from "../../utils/types";

interface RowExpanderProps {
  row: Row;
  isRowSelected: boolean;
  isExpanded: boolean;
  onRowExpand: () => void;
}

const RowExpander = ({
  row,
  isRowSelected,
  isExpanded,
  onRowExpand,
}: RowExpanderProps) => {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isRowSelected);
  return (
    <div className="row-expander">
      <Box component="span" onClick={onRowExpand}>
        <Box ref={ref} tabIndex={tabIndex} component="span">
          {isExpanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        </Box>
      </Box>
    </div>
  );
};

export default RowExpander;
