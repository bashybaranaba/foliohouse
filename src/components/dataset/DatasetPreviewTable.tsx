import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { decryptPreview } from "@/src/util/decryptPreview";

interface Props {
  datasetFile: string;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", m: 1, mr: 3 }}>
        <VisibilityOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />
        <Typography variant="subtitle2">Dataset preview</Typography>
      </Box>
    </GridToolbarContainer>
  );
}

export default function DatasetPreviewTable(props: Props) {
  const { datasetFile } = props;
  const [loading, setLoading] = useState(false);
  //const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    loadDatasetPreview();
  }, []);

  async function loadDatasetPreview() {
    setLoading(true);
    console.log(datasetFile);
    const data = await decryptPreview(
      datasetFile,
      process.env.NEXT_PUBLIC_DATASET_SECRET
    );

    const columnObjects = Object.keys(data[0]).map((columnItem) => {
      let item = { field: columnItem, headerName: columnItem };
      return item;
    });
    const rowObjects = data.map((rowItem, index) => {
      let item = { id: index, ...rowItem };
      return item;
    });
    setColumns(columnObjects);
    setRows(rowObjects);
    console.log(rowObjects);
    console.log(columnObjects);
    setLoading(false);
  }

  return (
    <div style={{ height: 350, width: "100%" }}>
      {loading ? <LinearProgress /> : null}
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
