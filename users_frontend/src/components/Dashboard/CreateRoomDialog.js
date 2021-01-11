import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import AddIcon from '@material-ui/icons/Add';
import { nspRooms } from '../../socket';
import UserCtx from '../../context/User';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  button: {
    margin: "20px 30px",
  }
}));

export default function CreateRoomDialog() {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useContext(UserCtx);
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState(50);
  const [password, setPassword] = React.useState("");
  const [turn, setTurn] = React.useState(20);
  const [status, setStatus] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValChange = (event) => {
    setVal(event.target.value);
  };

  const handleTurnChange = (event) => {
    setTurn(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  // Socket create room
  const handleCreateRoom = () => {
    let data;
    if (status) {
      data = {
        user,
        roomInfo: {
          cups: val,
          turn,
          password,
          isPrivate: status,
        }
      };
    } else {
      data = {
        user,
        roomInfo: {
          cups: val,
          turn,
          isPrivate: status,
        }
      };
    }
    nspRooms.emit('create_room', data);
    handleClose();
  }

  const handlePasswordChange = e => setPassword(e.target.value);

  useEffect(() => {
    nspRooms.on("create_room_success", (stateId)=>{
        history.push({
          pathname: '/game',
          state: stateId,
          time: turn,
          cup: val,
        });
    })
  })

  return (
    <React.Fragment>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        CREATE NEW ROOM
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Room Information</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <InputLabel htmlFor="cups">Cups</InputLabel>
            <Select
              value={val}
              onChange={handleValChange}
              inputProps={{
                name: 'cups',
                id: 'cups'
              }}
            >
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
            </Select>
            <InputLabel htmlFor="turn">Cups</InputLabel>
            <Select
              value={turn}
              onChange={handleTurnChange}
              inputProps={{
                name: 'turn',
                id: 'turn'
              }}
            >
              <MenuItem value={20}>20s</MenuItem>
              <MenuItem value={30}>30s</MenuItem>
              <MenuItem value={60}>60s</MenuItem>
            </Select>
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Switch checked={status} onChange={handleStatusChange} />}
              label="Private"
            />
            {(status) ?
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              /> : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleCreateRoom} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}