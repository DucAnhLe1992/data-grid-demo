import React, { useState } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { groupBy } from "lodash";
import DataGrid, { Column } from "react-data-grid";

import { useAppSelector } from "../../redux/hooks";
import { Row } from "../../utils/types";
import "./index.css";

const options = [
  "API",
  "Auth",
  "Category",
  "Cors",
  "Description",
  "HTTPS",
  "Link",
];

function rowKeyGetter(row: Row) {
  return row.id;
}

const Grouping = () => {
  const data = useAppSelector((state) => state.data.entries);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [expandedGroup, setExpandedGroup] = useState<any>(null);

  const columns: Column<Row>[] = [
    { key: "api", name: "API" },
    { key: "auth", name: "Auth" },
    { key: "category", name: "Category" },
    { key: "cors", name: "Cors" },
    { key: "description", name: "Description" },
    { key: "https", name: "HTTPS" },
    { key: "link", name: "Link" },
  ];

  const rows: Row[] = data?.map((row: any, index: number) => ({
    id: index,
    api: row.API,
    auth: row.Auth || "none",
    category: row.Category,
    cors: row.Cors,
    description: row.Description,
    https: row.HTTPS.toString(),
    link: row.Link,
  }));

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
    <div className="data-grid">
      <Typography variant="h6" component="div">
        Group by columns
      </Typography>

      <FormGroup
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
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

      {rows && (
        <DataGrid
          columns={columns}
          rows={rows}
          rowKeyGetter={rowKeyGetter}
          groupBy={selectedOptions}
          rowGrouper={groupBy}
          expandedGroupIds={expandedGroup}
          onExpandedGroupIdsChange={setExpandedGroup}
        />
      )}
    </div>
  );
};

export default Grouping;
