import { useState, useMemo } from "react";
import DataGrid, { Column, SortColumn } from "react-data-grid";
import "react-data-grid/lib/styles.css";

import { getComparator } from "../../utils/helpers";
import { Row } from "../../utils/types";
import { useAppSelector } from "../../redux/hooks";
import "./index.css";

const columns: Column<Row>[] = [
  { key: "api", name: "API" },
  { key: "auth", name: "Auth" },
  { key: "category", name: "Category" },
  { key: "cors", name: "Cors" },
  { key: "description", name: "Description" },
  { key: "https", name: "HTTPS" },
  { key: "link", name: "Link" },
];

const Sorting = () => {
  const data = useAppSelector((state) => state.data.entries);
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

  const rows: Row[] = useMemo(
    (): Row[] =>
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

  const sortedRows: Row[] = useMemo((): Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  return (
    <div className="data-grid">
      <DataGrid
        columns={columns}
        rows={sortedRows}
        defaultColumnOptions={{ sortable: true }}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
      />
    </div>
  );
};

export default Sorting;
