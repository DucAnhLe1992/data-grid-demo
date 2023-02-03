import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";

import { Unit, Orientation, Row, Header } from "../../utils/types";
import "./index.css";

interface SavePDFProps {
  orientation: Orientation;
  unit: Unit;
  size: string;
  title?: string;
  headers: string[];
  data: Row[];
  fileName: string;
}

const SavePDF = (props: SavePDFProps) => {
  const { orientation, unit, size, headers, data, fileName } = props;

  const body = data.map((row: Row) =>
    headers.reduce(
      (previous, current) => ({
        ...previous,
        [current.toLowerCase()]: row[current.toLowerCase() as Header],
      }),
      {}
    )
  );

  const columns = headers.map((header) => ({
    header,
    dataKey: header.toLowerCase(),
  }));

  const handleClick = () => {
    const doc = new jsPDF(orientation, unit, size);
    autoTable(doc, {
      theme: "grid",
      head: [headers],
      columns,
      body,
      styles: { overflow: "linebreak", cellWidth: "auto" },
      bodyStyles: { valign: "top" },
    });
    doc.save(`${fileName}.pdf`);
  };
  return (
    <Button onClick={handleClick} className="pdf-generation">
      Download PDF file
    </Button>
  );
};

export default SavePDF;
