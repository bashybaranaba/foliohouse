import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DatasetLinkedIcon from "@mui/icons-material/DatasetLinked";

import CreateNewDataset from "../dataset/CreateNewDataset";
export default function SideNav() {
  return (
    <Box sx={{ m: 4, border: "20px" }}>
      <List>
        <ListItem button component={Link} href="/">
          <ListItemIcon>
            <HomeIcon color="inherit" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/mydatasets">
          <ListItemIcon>
            <DatasetLinkedIcon />
          </ListItemIcon>
          <ListItemText primary="My datasets" />
        </ListItem>
        <ListItem button component={Link} href="/reports">
          <ListItemIcon>
            <LibraryAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="Verified reports" />
        </ListItem>
        <ListItem button component={Link} href="/validators">
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Validators" />
        </ListItem>
      </List>
      <Box sx={{ p: 1 }}></Box>
      <CreateNewDataset />
    </Box>
  );
}
