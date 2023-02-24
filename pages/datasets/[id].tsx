import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DatasetPreviewTable from "@/src/components/dataset/DatasetPreviewTable";
import HomeBanner from "@/src/components/layout/HomeBanner";
import SideNav from "@/src/components/layout/SideNav";
import MetadataCard from "@/src/components/dataset/MetadataCard";

export default function DatasetDetails() {
  return (
    <Grid container spacing={1}>
      <Box
        sx={{
          mt: 10,
          height: 130,
          borderRadius: 50,
          backgroundColor: "#fff",
          boxShadow:
            "0 0 90px 80px #fff, 0 0 100px 60px #f0f,  0 0 140px 80px #0ff",
        }}
      />
      <Grid item lg={3}>
        <HomeBanner />
        <Box sx={{ m: 2, border: 1, borderRadius: 4, borderColor: "#556cd6" }}>
          <SideNav />
        </Box>
      </Grid>
      <Grid item lg={6} sx={{ mt: 3 }}>
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Dataset Title
          </Typography>
          <Typography sx={{ mt: 2, mb: 3 }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>

          <DatasetPreviewTable />
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 4 }}>
            About Dataset
          </Typography>
          <Typography sx={{ mt: 2, mb: 3 }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3} sx={{ mt: 3 }}>
        <MetadataCard />
      </Grid>
    </Grid>
  );
}
