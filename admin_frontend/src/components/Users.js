import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Users(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        {
          props.users.map((i, index) => 
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={i.username} secondary={i.profile.nickname} />
              </ListItem>
          )
        }
    </List>
  );
}
