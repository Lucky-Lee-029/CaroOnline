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
    width: 150,
    height: 40,
  },
}));

const BlockedBtn = (props) => {
  const classes = useStyles();
  const blockedBtnText = (props.status==="Non-Blocked")?"BLOCKED": "UNBLOCKED";
  const colorBtn = (blockedBtnText === "BLOCKED")?"secondary":"primary";
  const [open, setOpen] = useState(false);

  const handleBlocked = () => {
    setOpen(true);
    };
  const handleUnblocked = () => {
    setOpen(true);  
    };

    const handleClose = () => {
        setOpen(false);
      };

  return (
    <Grid item >
      <Button
        //fullWidth
        startIcon={(blockedBtnText === "BLOCKED")?<EnhancedEncryptionIcon/>:<NoEncryptionIcon/>}
        variant="contained"
        color={colorBtn}
        className={classes.button}
        onClick={(blockedBtnText === "BLOCKED")?handleBlocked:handleUnblocked}
      >
        {blockedBtnText}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">CONFIRM</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure for <strong>{blockedBtnText}</strong> this user???
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

export default BlockedBtn;
