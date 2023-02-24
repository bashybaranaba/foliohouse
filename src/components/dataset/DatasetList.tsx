import * as React from "react";
import Grid from "@mui/material/Grid";
import DatasetCard from "./DatasetCard";

interface Props {
  datasets: any[];
}

export default function DatasetList(props: Props) {
  const { datasets } = props;
  return (
    <Grid container spacing={1}>
      {datasets.map((dataset, i) => (
        <DatasetCard data={dataset} />
      ))}
    </Grid>
  );
}
