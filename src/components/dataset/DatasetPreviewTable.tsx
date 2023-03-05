import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface Props {
  rows: any[];
  columns: any[];
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
  const { rows, columns } = props;

  return (
    <div style={{ height: 350, width: "100%" }}>
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
