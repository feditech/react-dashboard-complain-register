import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export default function FormDialog(props) {

  const userId = useSelector((state) => state.user ? state.user._id : null);
  const { open, handleClose, addClient } = props;
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const handleOnSubmit = () => {
    let newObj = {
      name,
      email,
      phone,
      address,
      clientId: userId,
      isActive: true,
    };
    addClient(newObj)
    onClose();
  };

  const onClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    handleClose();
  };
  return (
    // <div>
    <Dialog open={open} onClose={onClose} sx={{ marginTop: "40px" }}>
      <DialogTitle color={"primary"} sx={{ fontFamily: "PT Sans Narrow" }}>
        Clients
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent={"space-between"} sx={{ marginTop: "3px" }}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth id="outlined-basic" label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
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
