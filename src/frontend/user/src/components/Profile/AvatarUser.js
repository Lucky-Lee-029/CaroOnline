import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Title from './Title'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  CardMedia: {
    paddingTop: '81.25%',
    borderRadius: '50%',
    margin: '28px'
  },
  cover: {
    width: 150,
    height: 150,
  },
});

export default function AvatarUser() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Avatar</Title>
      <Avatar className = {classes.cover} alt="Avatar 1" src="/static/images/avatar/1.jpg" />
      <div>
        <Button color="primary" href="#" onClick={preventDefault}>
          Change Avatar
        </Button>
      </div>
    </React.Fragment>
  );
}