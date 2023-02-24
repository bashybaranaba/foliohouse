import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Typography from "@mui/material/Typography";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

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

export default function DatasetPreviewTable() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 350, width: "100%" }}>
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
