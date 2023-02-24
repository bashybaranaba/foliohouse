import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function HomeBanner() {
  return (
    <Box sx={{ m: 2, mb: 3 }}>
      <Typography
        variant="h3"
        sx={{
          m: 2,
          mt: 3,
          backgroundImage: "linear-gradient(240deg, #2196f3, #311b92)",
          backgroundClip: "text",
          textFillColor: "transparent",
          fontWeight: 600,
          fontSize: 55,
        }}
      >
        FolioHouse
      </Typography>
      <Typography
        variant="h4"
        sx={{
          m: 2,
          mb: 1,
          backgroundImage: "linear-gradient(50deg, #000, #37474f)",
          backgroundClip: "text",
          textFillColor: "transparent",
          fontWeight: 600,
        }}
      >
        A decentralized dataset repository
      </Typography>
      <Typography variant="h6" sx={{ m: 2, mt: 1 }}>
        Explore, analyze, and share quality datasets
      </Typography>
    </Box>
  );
}
