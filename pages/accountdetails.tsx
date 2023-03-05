import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import TollIcon from "@mui/icons-material/Toll";
import StorageIcon from "@mui/icons-material/Storage";

import HomeBanner from "@/src/components/layout/HomeBanner";
import SideNav from "@/src/components/layout/SideNav";

import { FoliohouseAddress } from "../config.js";
import Foliohouse from "../Foliohouse.json";

export default function AccountDetails() {
  const [datasets, setDatasets] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [tokensEarned, setTokensEarned] = useState(0);
  const [storageUsed, setStorageUsed] = useState(0);
  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const addressPromise = await signer.getAddress();

    const contract = new ethers.Contract(
      FoliohouseAddress,
      Foliohouse.abi,
      signer
    );

    const data = await contract.getOwnedDatasets();
    const tokendata = await contract.getMyTokens();
    const storagedata = await contract.getMyusedStorage();

    setAccountAddress(addressPromise);
    setTokensEarned(tokendata.toNumber());
    setStorageUsed(storagedata.toNumber() / (1024 * 1024 + 1024));
    const datasets: any[] = await Promise.all(
      data.map(async (i: any) => {
        let dataset = {
          id: i.id.toNumber(),
        };
        return dataset;
      })
    );
    setDatasets(datasets);
    datasets.sort((a, b) => b.id - a.id);
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
            <AssignmentIndOutlinedIcon sx={{ fontSize: 30, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Account Details
            </Typography>
          </Box>
        </Box>

        <Box sx={{ m: 2 }}>
          <Card
            elevation={0}
            sx={{ m: 1, border: 1, borderRadius: 6, borderColor: "#cfd8dc" }}
          >
            <CardContent>
              <Grid container spacing={1}>
                <Grid item sm={1} lg={1}>
                  <Avatar
                    aria-label="validator"
                    sx={{ bgcolor: "#556cd6", height: 50, width: 50, m: 1 }}
                  ></Avatar>
                </Grid>
                <Grid item sm={11} lg={11}>
                  {loading ? <LinearProgress /> : null}
                  <Box
                    sx={{
                      m: 1,
                      p: 1,
                      mb: 2,
                      borderRadius: 6,
                      backgroundColor: "#eceff1",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                      sx={{ m: 1, ml: 3 }}
                    >
                      {accountAddress}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      m: 1,
                      border: 1,
                      p: 2,
                      borderRadius: 6,
                      borderColor: "#cfd8dc",
                    }}
                  >
                    <Box sx={{ m: 1, mr: 3, display: "flex" }}>
                      <DatasetOutlinedIcon sx={{ mr: 2, color: "#5e35b1" }} />
                      <Typography variant="body1">
                        {" "}
                        Datasets: {datasets.length}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 1, mr: 3, display: "flex" }}>
                      <TollIcon sx={{ mr: 2, color: "#f57f17" }} />
                      <Typography variant="body1">
                        {" "}
                        Tokens earned: {tokensEarned}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 1, mr: 3, display: "flex" }}>
                      <StorageIcon sx={{ mr: 2, color: "#2962ff" }} />
                      <Typography variant="body1">
                        {" "}
                        Storage used: {storageUsed} GB
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
