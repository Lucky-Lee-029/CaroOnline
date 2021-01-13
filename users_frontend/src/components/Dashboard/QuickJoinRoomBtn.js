import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { nspRooms } from '../../socket';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "20px 30px",
  },
}));

const QuickJoinRoomBtn = (props) => {
  const {user} = props;
  const classes = useStyles();
  const roomIdRef = useRef();
  const history = useHistory();
  const [flashRoom, setFlashRoom] = useState("");

  const handleCreateRoom = () => {
    if(flashRoom === ""){
      let data;
      data = {
        user,
        roomInfo: {
          cups: 10,
          turn: 20,
          isPrivate: false,
        }
      };
      nspRooms.emit('create_flash_room', data);
    }else{
      nspRooms.emit("join", {roomId: flashRoom,user: user });
      history.push({
        pathname: '/game',
        state: flashRoom,
        time: 20,
        cup: 10
      });
    }
  }


  useEffect(() => {
    nspRooms.on("create_room_success_flash", (stateId)=>{
        history.push({
          pathname: '/game',
          state: stateId,
          time: 20,
          cup: 10
        });
    })
  },[])
  
  useEffect(()=>{
    nspRooms.on("quick_join", roomId => {
      console.log("get event quick join" , roomId);
      setFlashRoom(roomId);
    })
  },[])

  return (
    <Grid item>
      <Button
        startIcon={<SearchIcon />}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleCreateRoom}
      >
       Tham gia nhanh
      </Button>
    </Grid>
  );
};
export default QuickJoinRoomBtn;
