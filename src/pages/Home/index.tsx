import { useMemo } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

import { Row, Column } from "../../utils/types";
import { useAppSelector } from "../../redux/hooks";
import "./index.css";

const columns: Column[] = [
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

  const rows: Row[] = useMemo(
    () =>
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

  return (
    <div className="data-grid">
      {rows && <DataGrid columns={columns} rows={rows} />}
    </div>
  );
};

export default Home;
