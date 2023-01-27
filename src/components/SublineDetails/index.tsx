import { useRef, useEffect } from "react";
import DataGrid, { Column, DataGridHandle } from "react-data-grid";

import { Detail, Row } from "../../utils/types";
import "./index.css";

interface SublineDetailsProps {
  columns: Column<Row>[];
  rows: Detail[];
  isRowSelected: boolean;
}

const SublineDetails = ({
  rows,
  columns,
  isRowSelected,
}: SublineDetailsProps) => {
  const gridRef = useRef<DataGridHandle>(null);

  useEffect(() => {
    if (!isRowSelected) return;
    gridRef
      .current!.element!.querySelector<HTMLDivElement>('[tabindex="0"]')!
      .focus({ preventScroll: true });
  }, [isRowSelected]);

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={rows}
        ref={gridRef}
        rowKeyGetter={(row) => row.id}
        //onRowsChange={}
      />
    </div>
  );
};

export default SublineDetails;
