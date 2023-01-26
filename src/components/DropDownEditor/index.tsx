import { useMemo } from "react";
import { EditorProps } from "react-data-grid";
import { useAppSelector } from "../../redux/hooks";
import { Row } from "../../utils/types";

export function AuthEditor({ row, onRowChange }: EditorProps<Row>) {
  const data = useAppSelector((state) => state.data.entries);
  const options = useMemo(
    () =>
      Array.from(
        new Set(data?.map((row) => row.Auth.toString() || "none"))
      ).map((option) => option),
    [data]
  );

  return (
    <select
      value={row.auth}
      onChange={(event) =>
        onRowChange({ ...row, auth: event.target.value }, true)
      }
      autoFocus
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function CategoryEditor({ row, onRowChange }: EditorProps<Row>) {
  const data = useAppSelector((state) => state.data.entries);
  const options = useMemo(
    () =>
      Array.from(
        new Set(data?.map((row) => row.Category.toString() || "none"))
      ).map((option) => option),
    [data]
  );

  return (
    <select
      value={row.category}
      onChange={(event) =>
        onRowChange({ ...row, category: event.target.value }, true)
      }
      autoFocus
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function CorsEditor({ row, onRowChange }: EditorProps<Row>) {
  const data = useAppSelector((state) => state.data.entries);
  const options = useMemo(
    () =>
      Array.from(
        new Set(data?.map((row) => row.Cors.toString() || "none"))
      ).map((option) => option),
    [data]
  );

  return (
    <select
      value={row.cors}
      onChange={(event) =>
        onRowChange({ ...row, cors: event.target.value }, true)
      }
      autoFocus
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function HttpsEditor({ row, onRowChange }: EditorProps<Row>) {
  const data = useAppSelector((state) => state.data.entries);
  const options = useMemo(
    () =>
      Array.from(
        new Set(data?.map((row) => row.HTTPS.toString() || "none"))
      ).map((option) => option),
    [data]
  );

  return (
    <select
      value={row.https}
      onChange={(event) =>
        onRowChange({ ...row, https: event.target.value }, true)
      }
      autoFocus
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
