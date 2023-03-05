import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import DatasetPreviewTable from "@/src/components/dataset/DatasetPreviewTable";
import HomeBanner from "@/src/components/layout/HomeBanner";
import SideNav from "@/src/components/layout/SideNav";
import MetadataCard from "@/src/components/dataset/MetadataCard";

import { FoliohouseAddress } from "../../config.js";
import Foliohouse from "../../Foliohouse.json";
import { decryptPreview } from "@/src/util/decryptPreview";

export default function DatasetDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [dataset, setDataset] = useState<any>({});
  const [loadingState, setLoadingState] = useState("nor-loaded");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    loadDataset();
  }, []);

  async function loadDataset() {
    setLoading(true);
    /* create a generic provider and query new items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.hyperspace.node.glif.io/rpc/v1"
    );
    const contract = new ethers.Contract(
      FoliohouseAddress,
      Foliohouse.abi,
      provider
    );
    const data = await contract.getDatasetById(id);
    console.log(data);

    const meta = await axios.get(data.metaData);
    let datasetDetails = {
      id: data.id.toNumber(),
      size: data.size.toNumber(),
      name: data.name,
      fileUrl: data.fileUrl,
      headline: meta.data.headline,
      description: meta.data.description,
      image: meta.data.imageUrl,
      accessCount: data.accessCount.toNumber(),
      tokensEarned: data.tokensEarned.toNumber(),
      isPrivate: data.isPrivate,
    };

    setDataset(datasetDetails);
    loadDatasetPreview(datasetDetails.fileUrl);
    setLoading(false);
    setLoadingState("loaded");
  }

  async function loadDatasetPreview(datasetFile: string) {
    setLoading(true);
    console.log(datasetFile);
    const data: any[] = await decryptPreview(
      datasetFile,
      "0ed60d684aea75f4f4c761c9d9beab51"
    );

    if (!data) {
      console.log("Dataset file missing");
      return;
    }
    const columnObjects =
      Object.keys(data[0]) &&
      Object.keys(data[0]).map((columnItem) => {
        let item = { field: columnItem, headerName: columnItem };
        return item;
      });
    const rowObjects =
      data &&
      data.map((rowItem, index) => {
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
      {dataset && (
        <>
          <Grid item lg={6} sx={{ mt: 3 }}>
            <Box sx={{ m: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {dataset.name}
              </Typography>
              <Typography sx={{ mt: 2, mb: 3 }}>{dataset.headline}</Typography>
              {loading ? <LinearProgress /> : null}
              <DatasetPreviewTable rows={rows} columns={columns} />
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 4 }}>
                About Dataset
              </Typography>
              <Typography sx={{ mt: 2, mb: 3 }}>
                {dataset.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3} sx={{ mt: 3 }}>
            <MetadataCard data={dataset} />
          </Grid>
        </>
      )}
      {loading ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
      {loadingState === "loaded" && !dataset ? (
        <Box sx={{ m: 3 }}>
          <Typography variant="h6">No data</Typography>
        </Box>
      ) : null}
      <Box sx={{ m: 4 }} />
    </Grid>
  );
}
