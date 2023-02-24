import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function DetailsForm() {
  return (
    <Grid sx={{ width: "100%" }}>
      <TextField
        id="headline"
        label="Headline"
        fullWidth
        placeholder="A succinct headline for you dataset"
      />
      <TextField
        id="description"
        label="Description"
        multiline
        rows={5}
        fullWidth
        placeholder="A detailed description of the dataset"
        sx={{ mt: 2 }}
      />
      <Box
        sx={{
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
          <input type="file" hidden />
        </Button>
      </Box>
    </Grid>
  );
}
