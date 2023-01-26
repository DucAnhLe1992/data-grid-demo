import { Column } from "react-data-grid";

import { Row, Entry, Detail, Comparator } from "./types";

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

export const detailColumns: Column<Detail>[] = [
    { key: "api", name: "API" },
    { key: "auth", name: "Auth" },
    { key: "category", name: "Category" },
    { key: "cors", name: "Cors" },
    { key: "description", name: "Description" },
    { key: "https", name: "HTTPS" },
    { key: "link", name: "Link" },
];

export const getComparator = (sortColumn: string): Comparator => {
    return (a: any, b: any) => {
        return a[sortColumn].localeCompare(b[sortColumn]);
    };
};