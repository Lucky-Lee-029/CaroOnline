import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import SearchAppBar from "../Bar/Bar";
import { Grid } from '@material-ui/core';
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
  });

  const renderListItems = (items) => {
    if (items) {
      return Array.from(items).map((item) => {
        return (
          <ListItem key={item[0]} button>
            <ListItemAvatar>
              <Avatar>
                <AccountCircle />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item[1].user.profile.nickname} />
          </ListItem>
        );
      });
    }
  }

  return (
    <div>
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
