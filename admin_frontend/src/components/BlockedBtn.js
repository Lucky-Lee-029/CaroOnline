import axios from 'axios';
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 150,
    height: 40,
  },
}));

const BlockedBtn = (props) => {
  const classes = useStyles();
  const [btn, setBtn] = useState(props.user.active);

  const handleButton = () => {
    (async () => {
      try {
        const res = await axios.put(`http://localhost:8000/admin_api/block/${props.user._id}`,
          { active: !btn },
          {
            headers: {
              Authorization: localStorage.getItem("admin_token")
            }
          });
        const obj = await res.data;
        if (obj) {
          setBtn(!btn);
        }
      } catch (err) {
        console.error(err.response);
      }
    })();
  }

  return (
    <Grid item >
      <Button
        startIcon={(btn) ? <LockOpenIcon /> : <NoEncryptionIcon />}
        color={(btn) ? "primary" : "default"}
        variant="contained"
        className={classes.button}
        onClick={handleButton}
      >
        {(btn) ? "hoạt động" : "bị block"}
      </Button>
    </Grid>
  );
};

export default BlockedBtn;
