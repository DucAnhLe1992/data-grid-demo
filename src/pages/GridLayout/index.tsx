import React, { useMemo } from "react";
import _, { forEach } from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import { useAppSelector } from "../../redux/hooks";
import { initRows } from "../../utils/helpers";
import "./index.css";
import { Row } from "../../utils/types";

const ReactGridLayout = WidthProvider(RGL);

interface BasicLayoutProps {
  items: number;
  rowHeight: number;
  onLayoutChange: (args: any) => void;
  cols: number;
}

const BasicLayout = ({
  items,
  rowHeight,
  onLayoutChange,
  cols,
  ...props
}: BasicLayoutProps & any) => {
  const data = useAppSelector((state) => state.data.entries);
  const rows = useMemo(() => initRows(data), [data]);
  const layout = useMemo(
    () =>
      rows.map((_, i) => {
        const y = Math.ceil(Math.random() * 4) + 1;
        return {
          x: (i * 2) % 12,
          y: Math.floor(i / 6) * y,
          w: 2,
          h: 9,
          i: i.toString(),
          resizeHandles: ["s", "e", "se"],
        };
      }),
    [rows]
  );

  const generateDOM = (quantity: number, rows: Row[]) => {
    let newRows: number[] = [];
    const limit = rows.length;
    for (let i = 0; i < quantity; i++) {
      let tempId = Math.floor(Math.random() * limit);
      while (newRows.includes(tempId)) {
        tempId = Math.floor(Math.random() * limit);
      }
      newRows.push(tempId);
    }

    return newRows
      .map((id) => rows.find((row) => row.id === id))
      .map((row) => (
        <div key={row?.id} className="card">
          <p>
            <label>API: </label>
            {row?.api}
          </p>
          <p>
            <label>Authentication: </label>
            {row?.auth}
          </p>
          <p>
            <label>Category: </label>
            {row?.category}
          </p>
          <p>
            <label>CORS: </label>
            {row?.cors}
          </p>
          <p>
            <label>HTTPS: </label>
            {row?.https}
          </p>
          <p>
            <label>Link: </label>
            {row?.link}
          </p>
        </div>
      ));
  };

  return (
    <ReactGridLayout
      className="layout"
      layout={layout}
      onLayoutChange={onLayoutChange}
      rowHeight={rowHeight}
      cols={cols}
      isDraggable
      isResizable
      isBounded
      {...props}
    >
      {rows && rows.length > 0 && generateDOM(50, rows)}
    </ReactGridLayout>
  );
};

BasicLayout.defaultProps = {
  items: 20,
  rowHeight: 30,
  onLayoutChange: () => {},
  cols: 12,
};

export default BasicLayout;
