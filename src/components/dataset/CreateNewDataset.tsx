import * as React from "react";
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

const steps = ["Upload dataset", "Manage access", "Add details"];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNewDataset() {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [next, setnNext] = React.useState(false);
  const [finish, setFinish] = React.useState(false);

  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [isPublic, setIsPublic] = React.useState(true);
  const [allowedUsers, setallowedUsers] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

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
            {activeStep === 0 ? (
              <DatasetForm
                name={name}
                setName={setName}
                file={file}
                setFile={setFile}
              />
            ) : null}
            {activeStep === 1 ? <ManageAccess /> : null}
            {activeStep === 2 ? <DetailsForm /> : null}
            <Grid container spacing={2}>
              <Grid item xs={activeStep === 0 ? 0 : 6}>
                {activeStep !== 0 ? (
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
              <Grid item xs={activeStep === 0 ? 12 : 6}>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  sx={{ textTransform: "none", mt: 2 }}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
