import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import DatasetLoaderDialog from "./DatasetLoaderDialog";

interface Props {
  data: {
    id: number;
    size: number;
    name: string;
    fileUrl: string;
    headline: string;
    description: string;
    image: string;
    accessCount: number;
    tokensEarned: number;
    isPrivate: boolean;
  };
}

export default function MetaDataCard(props: Props) {
  const { data } = props;
  return (
    <Card
      elevation={0}
      sx={{ m: 2, border: 1, borderRadius: 6, borderColor: "#cfd8dc" }}
    >
      {data.image ? (
        <CardMedia
          component="img"
          height="100"
          image={data.image}
          alt="green iguana"
        />
      ) : (
        <Box sx={{ height: 100, backgroundColor: "#c5cae9" }} />
      )}

      <CardContent>
        <Box sx={{ m: 1, mt: 2, opacity: 0.8 }}>
          <Box sx={{ mr: 3, display: "flex" }}>
            <PeopleIcon sx={{ color: "#1565c0" }} />
            <Typography variant="body2">Contributors: 1</Typography>
          </Box>
          <Box sx={{ mr: 3, display: "flex" }}>
            <BubbleChartIcon sx={{ color: "#5e35b1" }} />
            <Typography variant="body2">
              Accesses: {data.accessCount}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ m: 1, mt: 2, mb: 0 }}>
          <DatasetLoaderDialog fileUrl={data.fileUrl} />
        </Box>
      </CardContent>
    </Card>
  );
}
