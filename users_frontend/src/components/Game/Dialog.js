import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router';
import { nspRooms } from '../../socket';

function WinDialog(props) {
  const { winner, open, cup, room} = props;
  const history = useHistory();
  const handlePlayAgain =()=>{

  };
  const handleOut = ()=>{
      nspRooms.emit("leave_room", room);
      history.push('/');
  }
  return (
    <Dialog className="dialog" aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">
            {winner === "you" ?
             `Chúc mừng! Bạn đã chiến thắng. \n Bạn nhận được ${cup} cup`
                
              : `Bạn đã thua! \n Bạn bị trừ ${cup} cup`}
        </DialogTitle>
        <Button variant="contained" color="primary" onClick={handlePlayAgain}>Choi Lai</Button>
        <Button variant="contained" color="secondary" onClick={handleOut}>Thoat</Button>
    </Dialog>
  );
}

export default WinDialog;