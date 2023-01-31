import { Column, textEditor } from "react-data-grid";

import {
  AuthEditor,
  CategoryEditor,
  CorsEditor,
  HttpsEditor,
} from "../components/DropDownEditor";
import { Row, Entry, Comparator, exportToPDFProps } from "./types";
import { dialogClasses } from "@mui/material";

export const groupingOptions = [
  "API",
  "Auth",
  "Category",
  "Cors",
  "Description",
  "HTTPS",
  "Link",
];

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
    expanded: false,
  }));

export const detailColumns: Column<Row>[] = [
  { key: "api", name: "API", editable: true, editor: textEditor },
  { key: "auth", name: "Auth", editable: true, editor: AuthEditor },
  { key: "category", name: "Category", editable: true, editor: CategoryEditor },
  { key: "cors", name: "Cors", editable: true, editor: CorsEditor },
  {
    key: "description",
    name: "Description",
    editable: true,
    editor: textEditor,
  },
  { key: "https", name: "HTTPS", editable: true, editor: HttpsEditor },
  { key: "link", name: "Link", editable: true, editor: textEditor },
];

export const getComparator = (sortColumn: string): Comparator => {
  return (a: any, b: any) => {
    return a[sortColumn].localeCompare(b[sortColumn]);
  };
};
