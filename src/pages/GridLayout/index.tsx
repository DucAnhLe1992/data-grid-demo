import React, { useState } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import "./index.css";

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
  const [layout, setLayout] = useState<any>(() =>
    _.map(new Array(items), function (item, i) {
      const y =
        (_.result(props, "y") as number) || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
      };
    })
  );

  const generateDOM = () => {
    return _.map(_.range(items), (i) => {
      return (
        <div key={i}>
          <span className="card">{i}</span>
        </div>
      );
    });
  };

  return (
    <ReactGridLayout
      className="layout"
      layout={layout}
      onLayoutChange={onLayoutChange}
      rowHeight={rowHeight}
      cols={cols}
      {...props}
    >
      {generateDOM()}
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
