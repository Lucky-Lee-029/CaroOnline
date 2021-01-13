import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Title from './Title'
import AvaPic from './avatar.jpg'

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
    width: 130,
    height: 130,
    margin: 'auto',
  },
  marginAuto: {
    margin: 'auto',
  },
});

export default function AvatarUser() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title className={classes.title}>Ảnh đại diện</Title>
      <Avatar className = {classes.cover} alt="Avatar 1" src={"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2470717529842686&height=200&width=200&ext=1613045022&hash=AeQbSUNu9Sl114a953E"} />
      <div className={classes.marginAuto}>
        <Button color="primary" onClick={preventDefault}>
          Đổi ảnh
        </Button>
      </div>
    </React.Fragment>
  );
}