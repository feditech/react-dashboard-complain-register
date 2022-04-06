import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";



export default function FormDialog(props) {
  const user = useSelector((state) => state.user);
  const { clients } = useSelector((state) => {
    return {
      clients: state.clients,
    }
  })
  const { open, handleClose, addComplain } = props;
  const [comment, setComment] = useState("")
  const [complainType, setComplainType] = useState("")
  const [selectedClient, setSelectedClient] = useState("")



  const handleOnSubmit = () => {
    console.log('useeeeeeeeeeeeeeeerrrrrrrrrrrrrrr', user)
    let newObj = {
      comment,
      complainType,
      clientId: selectedClient._id,
      createdBy: user._id
    };
    addComplain(newObj)
    onClose();
  };

  const onClose = () => {
    handleClose();
  };

  const handleClientSelect = (e, v) => {
    setSelectedClient(v)
  }


  return (
    // <div>
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ marginTop: "40px" }}
      sx={{ backgroundColor: "background" }}
    >
      <DialogTitle color={"text"} sx={{ fontFamily: "PT Sans Narrow" }}>
        Complain
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent={"space-between"} sx={{ marginTop: "3px" }}>
          <Grid item xs={12} md={12} lg={12}>
            <Autocomplete
              disablePortal
              // value={selectedCustomer !== "" ? selectedCustomer : null}
              id="clientSearch"
              options={clients}
              onChange={(e, v) => handleClientSelect(e, v)}
              getOptionLabel={(option) => option.email}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Client"
                // disabled={isCustomerSelected}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TextField
              id="outlined-multiline-static"
              label="Complain"
              fullWidth
              multiline
              rows={4}
              defaultValue="Default Value"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth id="outlined-basic"
              label="Type" variant="outlined"
              value={complainType}
              onChange={(e) => setComplainType(e.target.value)} />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField fullWidth id="outlined-basic" label="Duration" variant="outlined" onChange={(e) => setDuration(e.target.value)} />
          </Grid> */}
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
