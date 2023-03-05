import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Web3Storage } from "web3.storage";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { TransitionProps } from "@mui/material/transitions";
import DatasetForm from "./DatasetForm";
import DetailsForm from "./DetailsForm";
import ManageAccess from "./ManageAccess";

import { encryptFile } from "@/src/util/encryptFile";

import { FoliohouseAddress } from "../../../config.js";
import Foliohouse from "../../../Foliohouse.json";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ["Upload dataset", "Manage access", "Add details"];

export default function CreateNewDataset() {
  const router = useRouter();
  const storageToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2YWIyOTRhMTQ1RThENkU0ZDFCNmNlRTcwODAxZGNDMTkyOWQ5NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc5Mzg1Mjg3MTQsIm5hbWUiOiJGb2xpb2hvdXNlIn0.2mttZrpJ6UBXcJwqr28iUb1rV8cqR5Y0MuxhZp-h9n4";

  const storage = new Web3Storage({ token: storageToken });

  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(1);
  const [next, setNext] = React.useState(false);
  const [finish, setFinish] = React.useState(false);

  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [headline, setHeadline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    if (activeStep === steps.length) {
      setFinish(true);
    }
  }, [activeStep]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setActiveStep(nextStep);
    setFinish(false);
  };

  async function processDatasetFiles() {
    let files = {
      datasetFile: "",
      metadataUrl: "",
    };

    if (!file || !image) {
      console.log("File or image is missing");
      return;
    }

    const encryptedDataset = await encryptFile(
      file,
      "0ed60d684aea75f4f4c761c9d9beab51"
    );
    try {
      const encyptedDatasetFile = new File([encryptedDataset], "dataset");
      const resFile = await storage.put([encyptedDatasetFile]);
      const imageFile = new File([image], "image");
      const resImage = await storage.put([imageFile]);
      const datasetFileUrl = `https://dweb.link/ipfs/${resFile.toString()}/dataset`;
      const iamgeUrl = `https://dweb.link/ipfs/${resImage.toString()}/image`;
      const data = JSON.stringify({
        headline: headline,
        description: description,
        imageUrl: iamgeUrl,
      });
      const datablob = new Blob([data], { type: "application/json" });
      const dataFile = new File([datablob], "metadata.json");
      const resData = await storage.put([dataFile]);
      const metadataUrl = `https://dweb.link/ipfs/${resData.toString()}/metadata.json`;
      files = {
        datasetFile: datasetFileUrl,
        metadataUrl: metadataUrl,
      };
      console.log(files);
      return files;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function CreateDataset() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const processedDatasetFiles = await processDatasetFiles();
    const datasetFile = processedDatasetFiles?.datasetFile;
    const metadataUrl = processedDatasetFiles?.metadataUrl;

    let contract = new ethers.Contract(
      FoliohouseAddress,
      Foliohouse.abi,
      signer
    );

    let creationAction = await contract.createDataset(
      124,
      name,
      datasetFile,
      metadataUrl,
      isPrivate
    );

    await creationAction.wait();
    router.reload();
    handleClose();
  }

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        onClick={handleClickOpen}
        sx={{ textTransform: "none" }}
      >
        Create
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              height: 90,
              borderRadius: 50,
              backgroundColor: "#fff",
              boxShadow:
                "0 0 90px 80px #fff, 0 0 100px 60px #f0f,  0 0 140px 80px #0ff",
            }}
          />
        </Toolbar>
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: 600 }}
              variant="h5"
              component="div"
            >
              Create a new dataset
            </Typography>
            <Box sx={{ width: "100%", mt: 4, mb: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {activeStep === 1 ? (
              <DatasetForm
                name={name}
                setName={setName}
                file={file}
                setFile={setFile}
              />
            ) : null}
            {activeStep === 2 ? (
              <ManageAccess isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
            ) : null}
            {activeStep === 3 ? (
              <DetailsForm
                headline={headline}
                setHeadline={setHeadline}
                description={description}
                setDescription={setDescription}
                image={image}
                setImage={setImage}
              />
            ) : null}
            <Grid container spacing={2}>
              <Grid item xs={activeStep === 1 ? 0 : 6}>
                {activeStep !== 1 ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    sx={{ textTransform: "none", mt: 2 }}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                ) : null}
              </Grid>
              <Grid item xs={activeStep === 1 ? 12 : 6}>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  sx={{ textTransform: "none", mt: 2 }}
                  onClick={finish ? CreateDataset : handleNext}
                >
                  {finish ? "Finish" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
