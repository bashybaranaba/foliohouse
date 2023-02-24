import * as React from "react";
import Grid from "@mui/material/Grid";
import DatasetCard from "./DatasetCard";

export default function DatasetList() {
  return (
    <Grid container spacing={1}>
      <DatasetCard />
      <DatasetCard />
      <DatasetCard />
    </Grid>
  );
}
