import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import CodeSnippet from "./CodeSnippet";

export default function DatasetLoaderDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const code = `from foliohouse import load_dataset

dataset = load_dataset("BashyBaranaba/testdtatset")`;

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ textTransform: "none", borderRaduis: 3 }}
        onClick={handleClickOpen}
      >
        Use Dataset
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="code-dialog-title"
        aria-describedby="code-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="code-dialog-title">
          {"Load this dataset using the foliohouse library"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="code-dialog-description"></DialogContentText>
          <Paper
            elevation={0}
            sx={{ backgroundColor: "#eceff1", p: 2, pl: 2, borderRadius: 3 }}
          >
            <Typography sx={{ ml: 2 }}>pip install foliohouse</Typography>
          </Paper>
          <CodeSnippet code={code} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
