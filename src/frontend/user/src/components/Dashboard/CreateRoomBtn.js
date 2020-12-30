import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: "20px 30px",
  },
}));

const CreateRoomBtn = () => {
  const classes = useStyles();
  const roomIdRef = useRef();

  const handleCreateRoom = () => {};

  return (
    <Grid item>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleCreateRoom}
      >
        CREATE NEW ROOM
      </Button>
    </Grid>
  );
};

export default CreateRoomBtn;
