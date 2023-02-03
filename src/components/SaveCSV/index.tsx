import { CSVLink } from "react-csv";
import { Button } from "@mui/material";
import { LabelKeyObject } from "react-csv/components/CommonPropTypes";

import { Row } from "../../utils/types";
import "./index.css";

interface SaveCSVProps {
  data: Row[];
  headers: string[];
}

const SaveCSV = ({ data, headers }: SaveCSVProps) => {
  return (
    <Button className="csv-generation">
      <CSVLink
        className="csv-btn"
        filename="CSV-Excel-report"
        data={data}
        headers={headers.map(
          (column) =>
            ({
              label: column,
              key: column.toLowerCase(),
            } as LabelKeyObject)
        )}
      >
        Download CSV file
      </CSVLink>
    </Button>
  );
};

export default SaveCSV;
