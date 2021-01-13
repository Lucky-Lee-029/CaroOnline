import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router';
import { nspRooms } from '../../socket';
import UserCtx from '../../context/User';
import axios from 'axios';

function WinDialog(props) {
  const { winner, open, cup, room, socket } = props;
  const history = useHistory();
  const [user, setUser] = useContext(UserCtx);
  const handlePlayAgain = () => {

  };
  const handleOut = () => {
    nspRooms.emit("leave_room", room, user);
    history.push('/');
  };

  if (user) {
    return (
      <Dialog className="dialog" aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">
          {winner === "you" ?
            `Chúc mừng! Bạn đã chiến thắng. \n Bạn nhận được ${cup} cup`

            : `Bạn đã thua! \n Bạn bị trừ ${cup} cup`}
        </DialogTitle>
        <p>Số cúp: {winner === "you" ? (user.cup + cup) : (user.cup - cup)}</p>
        <Button variant="contained" color="primary" onClick={handlePlayAgain}>Choi Lai</Button>
        <Button variant="contained" color="secondary" onClick={handleOut}>Thoat</Button>
      </Dialog>
    );
  } else return null;
}

export default WinDialog;