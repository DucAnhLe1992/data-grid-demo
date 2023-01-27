import { useMemo, useState } from "react";
import DataGrid, { Column, RowsChangeData } from "react-data-grid";
import "react-data-grid/lib/styles.css";

import { Row, Detail, Entry } from "../../utils/types";
import { useAppSelector } from "../../redux/hooks";
import SublineDetails from "../../components/SublineDetails";
import "./index.css";
import RowExpander from "../../components/RowExpander";

const detailColumns: Column<Detail>[] = [
  { key: "api", name: "API" },
  { key: "auth", name: "Auth" },
  { key: "category", name: "Category" },
  { key: "cors", name: "Cors" },
  { key: "description", name: "Description" },
  { key: "https", name: "HTTPS" },
  { key: "link", name: "Link" },
];

const Home = () => {
  const data = useAppSelector((state) => state.data.entries);

  const initRows = (entries: Entry[]) =>
    entries?.map((row: Entry, index: number) => ({
      id: index,
      api: row.API,
      auth: row.Auth || "none",
      category: row.Category,
      cors: row.Cors,
      description: row.Description,
      https: row.HTTPS.toString(),
      link: row.Link,
      expanded: false,
    }));

  const [rows, setRows] = useState<Row[]>(initRows(data));
  useMemo(() => {
    setRows(initRows(data));
  }, [data]);

  const details: Detail[] = useMemo(
    () =>
      rows?.map((row) => ({
        type: "detail",
        ...row,
      })),
    [rows]
  );

  const columns: Column<Row | Detail>[] = [
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
              columns={detailColumns as unknown as Column<Row>[]}
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
    { key: "api", name: "API" },
    { key: "auth", name: "Auth" },
    { key: "category", name: "Category" },
    { key: "cors", name: "Cors" },
    { key: "description", name: "Description" },
    { key: "https", name: "HTTPS" },
    { key: "link", name: "Link" },
  ];

  const onRowsChange = (rows: Row[], { indexes }: RowsChangeData<Row>) => {
    const row = rows[indexes[0]];
    if (!row.expanded) {
      rows.splice(indexes[0] + 1, 1);
    } else {
      rows.splice(indexes[0] + 1, 0, details[row.id]);
    }
    setRows(rows);
  };

  return (
    <div className="data-grid">
      {rows && (
        <DataGrid
          columns={columns}
          rows={rows}
          defaultColumnOptions={{ resizable: true }}
          onRowsChange={onRowsChange}
          rowHeight={(args) =>
            args.type === "ROW" && args.row.type === "detail" ? 120 : 35
          }
          rowKeyGetter={(row) => row.id}
        />
      )}
    </div>
  );
};

export default Home;
