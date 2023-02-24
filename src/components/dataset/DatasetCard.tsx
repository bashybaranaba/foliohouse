import * as React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

export default function DatasetCard() {
  const router = useRouter();
  const image = null;
  const handleClick = () => {
    router.push("/datasets/1");
  };
  return (
    <Grid item xs={12} lg={4}>
      <Card elevation={0} sx={{ m: 1, border: 1, borderRadius: 6 }}>
        <CardActionArea onClick={handleClick}>
          {image ? (
            <CardMedia
              component="img"
              height="100"
              image={image}
              alt="green iguana"
            />
          ) : (
            <Box sx={{ height: 100, backgroundColor: "#c5cae9" }} />
          )}

          <CardContent sx={{ m: 1 }}>
            <Typography gutterBottom variant="h6" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species,
            </Typography>

            <Box sx={{ m: 1, mt: 2, display: "flex", opacity: 0.8 }}>
              <Box sx={{ mr: 3, display: "flex" }}>
                <PeopleIcon sx={{ color: "#1565c0" }} />
                <Typography variant="body2">3</Typography>
              </Box>
              <Box sx={{ mr: 3, display: "flex" }}>
                <BubbleChartIcon sx={{ color: "#5e35b1" }} />
                <Typography variant="body2">100</Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
