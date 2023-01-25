import { useMemo, useState } from "react";
import DataGrid, { textEditor } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import {
  AuthEditor,
  CategoryEditor,
  CorsEditor,
  HttpsEditor,
} from "../../components/DropDownEditor";

import { useAppSelector } from "../../redux/hooks";
import { columns, initRows } from "../../utils/helpers";
import "./index.css";

const newColumns = columns.map((column) => {
  /* if (["API", "Description", "Link"].includes(column.name as string))
    return {
      ...column,
      editable: true,
      editor: textEditor,
    }; */
  if (column.name === "Auth")
    return {
      ...column,
      editable: true,
      editor: AuthEditor,
    };

  if (column.name === "Category")
    return {
      ...column,
      editable: true,
      editor: CategoryEditor,
    };

  if (column.name === "Cors")
    return {
      ...column,
      editable: true,
      editor: CorsEditor,
    };

  if (column.name === "HTTPS")
    return {
      ...column,
      editable: true,
      editor: HttpsEditor,
    };

  return {
    ...column,
    editable: true,
    editor: textEditor,
  };
});

const Editing = () => {
  const data = useAppSelector((state) => state.data.entries);
  const [rows, setRows] = useState(initRows(data));
  useMemo(() => {
    setRows(initRows(data));
  }, [data]);

  return (
    <div className="data-grid">
      {rows && (
        <DataGrid
          columns={newColumns}
          rows={rows}
          rowKeyGetter={(row) => row.id}
          onRowsChange={setRows}
        />
      )}
    </div>
  );
};

export default Editing;
