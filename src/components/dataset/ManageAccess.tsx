import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";

import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function ManageAccess() {
  const [selectedValue, setSelectedValue] = React.useState("public");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Grid sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", m: 3 }}>
        <Radio
          checked={selectedValue === "public"}
          onChange={handleChange}
          value="public"
          name="radio-buttons"
          inputProps={{ "aria-label": "Public" }}
        />
        <CollectionsBookmarkOutlinedIcon sx={{ m: 1 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Public
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Anyone on the internet can see, access and use this dataset
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", m: 3 }}>
        <Radio
          checked={selectedValue === "private"}
          onChange={handleChange}
          value="private"
          name="radio-buttons"
          inputProps={{ "aria-label": "Private" }}
        />
        <LockOutlinedIcon sx={{ m: 1 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Private
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Only you and authorized members can see and use this dataset
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
