import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface Props {
  headline: string;
  setHeadline: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  image: any;
  setImage: Dispatch<SetStateAction<any>>;
}

export default function DetailsForm(props: Props) {
  const {
    headline,
    setHeadline,
    description,
    setDescription,
    image,
    setImage,
  } = props;
  return (
    <Grid sx={{ width: "100%" }}>
      <TextField
        id="headline"
        label="Headline"
        fullWidth
        placeholder="A succinct headline for you dataset"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
      />
      <TextField
        id="description"
        label="Description"
        multiline
        rows={5}
        fullWidth
        placeholder="A detailed description of the dataset"
        sx={{ mt: 2 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          border: 1,
          borderRadius: 3,
          borderColor: "#556cd6",
          borderStyle: "dashed",
          p: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          component="label"
          sx={{ textTransform: "none" }}
        >
          Upload image
          <input
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>
        {image ? (
          <Card
            elevation={0}
            sx={{
              ml: 2,
              border: 1,
              borderRadius: 2,
              borderColor: "#cfd8dc",
              width: "70%",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={2}
                lg={2}
                alignItems="center"
                sx={{ bgcolor: "#556cd6" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#fff", m: 1, ml: 2 }}
                >
                  {image.name.split(".").pop()}
                </Typography>
              </Grid>
              <Grid item xs={2} lg={10}>
                <Typography
                  noWrap
                  variant="body2"
                  color="text.secondary"
                  sx={{ m: 1 }}
                >
                  {image.name}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ) : null}
      </Box>
    </Grid>
  );
}
