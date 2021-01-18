import axios from 'axios';
import React, { Profiler, useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import SearchAppBar from "../Bar/Bar";
import { Grid, Typography } from '@material-ui/core';
import GridItem from './Grid';
import SearchRoom from './Search';
import QuickJoinRoomBtn from './QuickJoinRoomBtn'
import UserCtx from '../../context/User';
import { nspOnlineUsers, nspRooms } from '../../socket';
import Badge from '@material-ui/core/Badge';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  TextField,
  Paper,
  makeStyles,
  withStyles
} from "@material-ui/core";
import CreateRoomDialog from './CreateRoomDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chart from '../Chart/Chart';
import Profile from '../Profile/Profile';
import Game from '../Game/Game';
import Alert from '@material-ui/lab/Alert';
import ReviewGame from '../ReviewMatch/ReviewGame';

function VerifyEmail() {
  const [user, setUser] = useContext(UserCtx);
  const [status, setStatus] = useState("Send");
  const [color, setColor] = useState();
  const [alert, setAlert] = useState();

  const handleClickButton = () => {
    setStatus("Resend");
    setColor("primary");

    // Call api
    (async () => {
      try {
        const res = await axios.post('http://localhost:8000/users_api/user/verify_email', {
          userId: user._id,
          email: user.profile.email
        });
        const obj = await res.data;
        setAlert({
          status: "success",
          msg: obj.msg
        });
      } catch (err) {
        setAlert({
          status: "error",
          msg: "Can not send email"
        });
      }
    })();
  }

  if (user) {
    return (

      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: 250 }}
      >
        
        <Grid item>
          <TextField
            label="Email"
            id="outlined-margin-dense"
            defaultValue={user.profile.email}
            margin="dense"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleClickButton} color={color}>{status}</Button>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={3}>
          {(alert) ? <Alert severity={alert.status}>{alert.msg}</Alert> : null}
        </Grid>
      </Grid>
    );
  } else return null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    //backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  gridItem: {
    border: 5,
    borderRadius: 3,
    borderColor: "black",
    textAlign: "center",
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useContext(UserCtx);
  const [onlineUsers, setOnlineUsers] = useState();
  const [userDialog, setUserDialog] = useState();
  const [open, setOpen] = useState(false);
  const [listRooms, setListRooms] = useState([]);

  const handleClickOpen = (userItem) => {
    setOpen(true);
    setUserDialog(userItem);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const api = 'http://localhost:8000/users_api/auth';
    const opts = {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    // Fetch user from API & set user context
    (async (api, opts) => {
      try {
        const res = await axios(api, opts);
        const obj = await res.data;
        setUser(obj.user); // Set user context
      } catch (err) {
        nspOnlineUsers.emit("logout");
        setUser(null); // Set null context
        history.replace('/login'); // Redirect to Login screen
      }
    })(api, opts);
  }, [history, setUser]);

  useEffect(() => {
    if (user) {
      nspOnlineUsers.emit("active", user);
      if (!user.active) {
        history.replace({
          pathname: '/login',
          state: { error: "Tài khoản của bạn đã bị khoá, chịu" }
        });
        localStorage.removeItem("token");
      }
      if (user.type === 'local' && !user.local.isVerified) {
        history.replace('/verify_email');
      }
    }
  }, [history, user]);

  useEffect(() => {
    nspOnlineUsers.on("list_users", (users) => {
      const obj = Object.entries(users).sort(); // Convert obj to array
      setOnlineUsers(obj);
    });
  }, []);

  function stringToHslColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }

  const renderListItems = (items) => {
    if (items) {
      return Array.from(items).map((item) => {
        if (user._id === item[0]) {
          return;
        }

        return (
          <ListItem key={item[0]} button onClick={() => handleClickOpen(item[1].user)}>
            <ListItemAvatar>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
              >
                {(item[1].user.type === 'local') ?
                  <Avatar style={{ backgroundColor: stringToHslColor(item[1].user.profile.name, 100, 50) }}>
                    {item[1].user.profile.name[0]}
                  </Avatar> :
                  <Avatar alt={item[0]} src={item[1].user.profile.avatar} />
                }
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText primary={item[1].user.profile.name} />
          </ListItem>
        );
      });
    }
  }

  useEffect(() => {
    nspRooms.emit("list_rooms");
  }, []);

  useEffect(() => {
    nspRooms.on("rooms", (rooms) => {
      const obj = Object.entries(rooms).sort(); // Convert obj to array
      setListRooms(obj);
    });
  }, [setListRooms]);

  const roomsSort = (a, b, type) => {
    switch(type){
      case 1:
        return inCreaseSort(a, b);
        break;
      case 2:
        return deCreaseSort(a, b);
        break;
      case 3:
        return inCupSort(a, b);
        break;
      case 4:
        return deCupSort(a, b);
        break;
      default:
        return inCreaseSort(a, b);
        break;
    }
  }
  const inCreaseSort = (a, b) => {
    return a[0] - b[0];
  }

  const deCreaseSort = (a, b) => {
    return b[0] - a[0];
  }

  const inCupSort = (a, b) => {
    return a[1].cups - b[1].cups;
  }

  const deCupSort = (a, b) => {
    return b[1].cups - a[1].cups;
  }

  return (
    <div>
      {(userDialog) ?
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Thông tin người dùng</DialogTitle>
          <DialogContent>
            <Grid container style={{ flexRow: 1 }} spacing={1}>
              <Grid item xs={4} align="center">
                <div>
                  {
                    (userDialog.type === 'local') ?
                      <Avatar variant="rounded" style={{ backgroundColor: stringToHslColor(userDialog.profile.name, 100, 50) }}>
                        {userDialog.profile.name[0]}
                      </Avatar> :
                      <Avatar variant="rounded" alt={userDialog._id} src={userDialog.profile.avatar} />
                  }
                </div>
              </Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper}>{userDialog.profile.name}</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Tham gia vào
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper}>
                  {userDialog.createdAt}
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
              Mời
          </Button>
          </DialogActions>
        </Dialog>
        : null}
      <SearchAppBar />
      <Grid container className={classes.root}>
        <Grid item xs={10}>
          <Switch>
            <Route exact path="/review" component={ReviewGame} />
          </Switch>
          <Switch>
            <Route exact path='/' render={() =>
              <React.Fragment>
                <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
                  <QuickJoinRoomBtn user={user} handleJoinRoom={() => { }} />
                  <CreateRoomDialog />
                  <SearchRoom/>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  {
                    listRooms.sort(function(a,b){return roomsSort(a,b,4)}).map(room => (
                      <Grid item xs={12} sm={4} key={room[0]}>
                        <GridItem roomInfo={room} />
                      </Grid>
                    ))
                  }
                </Grid>
              </React.Fragment>
            } />
            <Route exact path='/profile' component={Profile} />
            <Route exact path="/chart" component={Chart} />
            <Route exact path="/game" component={Game} />
            <Route exact path='/verify_email' component={VerifyEmail} />
          </Switch>
        </Grid>
        <Grid item xs={2}>
          <List
            subheader={
              <>
                <ListSubheader>
                  Người chơi đang <strong>online</strong>
                </ListSubheader>
              </>
            }
          >
            {renderListItems(onlineUsers)}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard;
