import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { nspRooms } from "../../socket";
import UserCtx from "../../context/User";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderWidth: 'medium',
  },
  gridList: {
    width: 800,
    height: 350,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bull: {

  }
}));
const GridItem = ({ roomInfo }) => {
  const classes = useStyles();
  const [user] = useContext(UserCtx);
  const [open, setOpen] = useState(false);

  const handleJoinRoomPublic = () => { alert("Public") };
  const handleJoinRoomPrivate = () => {
    setOpen(true);
  };
  const handleWatchRoomPublic = () => { alert("Public") };
  const handleWatchRoomPrivate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinRoom = (roomId) => {
    console.log(roomId);
    nspRooms.emit("join", { roomId, user });
  };



  return (
    roomInfo[1].status !== "Playing" ?
      <Grid item xs={12}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.pos} color='initial'>
              <strong> Room ID: {roomInfo[0]} </strong>
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            {roomInfo[1].turn}s
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            {roomInfo[1].status}
            </Typography>
            <Typography variant="h5" component="h2">
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {(roomInfo[1].isPrivate)? "Private" : "Public"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small" variant="contained" color="primary"
              onClick={() => handleJoinRoom(roomInfo[0])} >
              Join
                        </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Notification</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This is private room, please enter password
                                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="passwordRoom"
                  label="Password"
                  type="passwordRoom"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                                </Button>
                <Button onClick={handleClose} color="primary">
                  Enter
                                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
      </Grid>
      :
      <Grid item xs={12}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.pos} color='initial'>
              <strong> Room ID: {roomInfo[0]} </strong>
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Gaming ...
                        </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {(roomInfo[1].isPrivate)? "Private" : "Public"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small" variant="contained" color="primary" >
              Watch
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Notification</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This is private room, please enter password
                                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="passwordRoom"
                  label="Password"
                  type="passwordRoom"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                                </Button>
                <Button onClick={handleClose} color="primary">
                  Enter
                                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
      </Grid>
  )
};
export default withRouter(GridItem);