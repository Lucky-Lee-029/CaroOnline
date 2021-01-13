import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router';
import { nspRooms } from '../../socket';
import UserCtx from '../../context/User';
import axios from 'axios';

function WinDialog(props) {
  const { winner, open, cup, room} = props;
  const history = useHistory();
  const [user, setUser] = useContext(UserCtx);
  const [winRate, setWinRate] = useState(100);
  const [count, setCount] = useState(0);
  const handlePlayAgain = () => {

  };
  const handleOut = () => {
    nspRooms.emit("leave_room", room, user);
    history.push('/');
  };

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await axios(`http://localhost:8000/users_api/win_rate`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          const obj = await res.data;
          setWinRate(obj.rate.toFixed(2));
        } catch (err) {
          setWinRate(0);
        }
      })();
    }
  }, [setWinRate, user]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await axios(`http://localhost:8000/users_api/game/matches`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          const obj = await res.data.matches;
          console.log("sdasdasdasdasda");
          console.log(res);
          setCount(obj);
        } catch (err) {
          setCount(0);
        }
      })();
    }
  }, []);

  if (user) {
    return (
      <div>
        <Dialog className="dialog" aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">
            {winner === "you" ?
              `Chúc mừng! Bạn đã chiến thắng. \n Bạn nhận được ${cup} cup`

              : `Bạn đã thua! \n Bạn bị trừ ${cup} cup`}
          </DialogTitle>
          <p>Số cúp: {winner === "you" ? (user.cup + cup) : (user.cup - cup)}</p>
          <p>Tỉ lệ thắng: {winRate}%</p>
          <p>Số trận: {count}</p>
          <Button variant="contained" color="secondary" onClick={handleOut}>Thoát</Button>
        </Dialog>
      </div>
    );
  } else return null;
}

export default WinDialog;