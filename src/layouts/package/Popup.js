import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

export default function FormDialog(props) {
  const userId = useSelector((state) => state.user ? state.user._id : null);

  const { open, handleClose, obj, addPackage } = props;
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")
  const handleOnSubmit = () => {
    let newObj = {
      packageName: name,
      price,
      duration,
      clientId: userId,
      isActive: true,
    };
    addPackage(newObj)
    onClose();
  };

  const onClose = () => {
    handleClose();
  };
  return (
    // <div>
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ marginTop: "40px" }}
      sx={{ backgroundColor: "background" }}
    >
      <DialogTitle color={"text"} sx={{ fontFamily: "PT Sans Narrow" }}>
        Packages
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent={"space-between"} sx={{ marginTop: "3px" }}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setPrice(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth id="outlined-basic" label="Duration" variant="outlined" onChange={(e) => setDuration(e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={"text"} variant="contained">
          Close
        </Button>
        <Button onClick={handleOnSubmit} color={"text"} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    // </div>
  );
}
