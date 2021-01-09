import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import SearchAppBar from "../Bar/Bar";
import { Grid, Typography } from '@material-ui/core';
import GridItem from './Grid';
import QuickJoinRoomBtn from './QuickJoinRoomBtn'
import UserCtx from '../../context/User';
import { nspOnlineUsers } from '../../socket';
import { AccountCircle } from "@material-ui/icons";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles
} from "@material-ui/core";
import CreateRoomDialog from './CreateRoomDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
  bull: {

  },

}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useContext(UserCtx);
  const [onlineUsers, setOnlineUsers] = useState();
  const [userDialog, setUserDialog] = useState();
  const [open, setOpen] = useState(false);

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
        setUser(null); // Set null context
        history.replace('/login'); // Redirect to Login screen
      }
    })(api, opts);
  }, [history, setUser]);

  useEffect(() => {
    if (user) {
      nspOnlineUsers.emit("active", user);
    }
  }, [user]);

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
        return (
          <ListItem key={item[0]} button onClick={() => handleClickOpen(item[1].user)}>
            <ListItemAvatar>
              {(item[1].user.type === 'local') ?
                <Avatar style={{ backgroundColor: stringToHslColor(item[1].user.profile.name, 100, 50) }}>
                  {item[1].user.profile.name[0]}
                </Avatar> : 
                <Avatar alt={item[0]} src={item[1].user.profile.avatar} />
                }
            </ListItemAvatar>
            <ListItemText primary={item[1].user.profile.name} />
          </ListItem>
        );
      });
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">User infomation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
            Invite
          </Button>
        </DialogActions>
      </Dialog>
      <SearchAppBar />
      <Grid container className={classes.root}>
        <Grid item xs={10}>
          <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
            <QuickJoinRoomBtn />
            <CreateRoomDialog />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} sm={4}>
              <GridItem status="gaming" roomId={1} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GridItem roomId={2} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GridItem order="Private" roomId={3} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GridItem order="Private" roomId={4} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GridItem roomId={5} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GridItem status="gaming" order="Private" roomId={6} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <List
            subheader={
              <>
                <ListSubheader>
                  Players đang <strong>online</strong>
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
