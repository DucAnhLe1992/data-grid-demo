import { Column } from "react-data-grid";

import { Row, Entry } from "../types";

export const columns: Column<Row>[] = [
    { key: "api", name: "API" },
    { key: "auth", name: "Auth" },
    { key: "category", name: "Category" },
    { key: "cors", name: "Cors" },
    { key: "description", name: "Description" },
    { key: "https", name: "HTTPS" },
    { key: "link", name: "Link" },
];

export const initRows = (data: Entry[]): Row[] =>
    data?.map((row: any, index: number) => ({
        id: index,
        api: row.API,
        auth: row.Auth || "none",
        category: row.Category,
        cors: row.Cors,
        description: row.Description,
        https: row.HTTPS.toString(),
        link: row.Link,
    }));

