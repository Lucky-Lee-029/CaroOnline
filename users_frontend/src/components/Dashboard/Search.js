import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { nspRooms } from '../../socket';
import UserCtx from '../../context/User';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function SearchRoom() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserCtx);
  const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const onChangeRoom = (e) => {
    setRoomId(e.target.value.toString());
  }

  const findRoom = () => {
    nspRooms.emit("find_room", roomId);
  }

  useEffect(()=>{
    nspRooms.on("room_not_exists", () => {
    });
  },[])

  useEffect(()=>{
    nspRooms.on("room_exists", (roomInfo, id) => {
        nspRooms.emit("join", { roomId: id, user: user });
        history.replace({
            pathname: '/game',
            state: id,
            time: roomInfo.turn,
            cup: roomInfo.cups
            });
        });
  },[])

  return (
    <form className={classes.root} noValidate autoComplete="off" >
      <TextField id="standard-basic" label="ID phong" onChange={onChangeRoom}/>
      <Button variant="contained" color="primary" onClick={findRoom}>Tìm phòng</Button>
    </form>
  );
}