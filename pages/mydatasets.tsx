import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";

import DatasetList from "@/src/components/dataset/DatasetList";
import HomeBanner from "@/src/components/layout/HomeBanner";
import SideNav from "@/src/components/layout/SideNav";

import { FoliohouseAddress } from "../config.js";
import Foliohouse from "../Foliohouse.json";

export default function Mydatasets() {
  const [datasets, setDatasets] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadDatasets();
  }, []);

  async function loadDatasets() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      FoliohouseAddress,
      Foliohouse.abi,
      signer
    );

    const data = await contract.getOwnedDatasets();

    /*  map over items returned from smart contract and format then */
    const datasets: any[] = await Promise.all(
      data.map(async (i: any) => {
        const meta = await axios.get(i.metaData);
        let dataset = {
          id: i.id.toNumber(),
          size: i.size,
          name: i.name,
          fileUrl: i.fileUrl,
          headline: meta.data.headline,
          description: meta.data.description,
          image: meta.data.imageUrl,
          accessCount: i.accessCount.toNumber(),
          tokensEarned: i.tokensEarned.toNumber(),
          isPrivate: i.isPrivate,
        };
        return dataset;
      })
    );
    setDatasets(datasets);
    datasets.sort((a, b) => b.id - a.id);
    setLoading(false);
    setLoadingState("loaded");
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
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: 2,
          borderRadius: 50,
          backgroundColor: "#fff",
          boxShadow:
            "0 0 50px 10px #fff, 0 0 60px 10px #fff59d,  0 0 70px 40px #0ff",
        }}
      />

      <Grid item lg={3}>
        <HomeBanner />
        <Box sx={{ m: 2, border: 1, borderRadius: 4, borderColor: "#556cd6" }}>
          <SideNav />
        </Box>
      </Grid>
      <Grid item lg={8}>
        <Box sx={{ m: 3, mb: 2 }}>
          <Box sx={{ display: "flex" }}>
            <DatasetLinkedOutlinedIcon sx={{ fontSize: 30, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              My Datasets
            </Typography>
          </Box>
        </Box>

        <Box sx={{ m: 2 }}>
          {loading ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
          <DatasetList datasets={datasets} />
          {loadingState === "loaded" && !datasets.length ? (
            <Box sx={{ m: 3 }}>
              <Typography variant="h6">No datasets yet</Typography>
            </Box>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}
