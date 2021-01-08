import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';


const useStyles = makeStyles((theme) => ({
  button: {
    width: 100,
    height: 40,
  },
}));

const SavedBtn = (props) => {
  const classes = useStyles();
  const savedBtnText = (props.status==="Unsaved")?"SAVED": "UNSAVED";
  const colorBtn = (savedBtnText === "SAVED")?"primary":"secondary";
  const [open, setOpen] = useState(false);

  const handleSaved = () => {
    setOpen(true);
    };
  const handleUnsaved = () => {
    setOpen(true);  
    };

    const handleClose = () => {
        setOpen(false);
      };

  return (
    <Grid item >
      <Button
        //fullWidth
        //startIcon={(savedBtnText === "SAVED")?<EnhancedEncryptionIcon/>:<NoEncryptionIcon/>}
        variant="contained"
        color={colorBtn}
        className={classes.button}
        onClick={(savedBtnText === "SAVED")?handleSaved:handleUnsaved}
      >
        {savedBtnText}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">CONFIRM</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure for <strong>{savedBtnText}</strong> this match???
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Yes
                </Button>
                <Button onClick={handleClose} color="secondary">
                    No
                </Button>
            </DialogActions>
        </Dialog>
    </Grid>
  );
};

export default SavedBtn;
