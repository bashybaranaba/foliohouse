import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function DatasetForm() {
  return (
    <Grid sx={{ width: "100%" }}>
      <TextField required id="name" label="Dataset name" fullWidth />
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
          Upload file
          <input type="file" hidden />
        </Button>
      </Box>
    </Grid>
  );
}
