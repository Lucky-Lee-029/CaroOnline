import { useContext, useEffect, useState } from 'react';
import NavBar from './NavBar';
import io from '../socket';
import { UserContext } from '../contexts';
import Users from './Users';

function DashBoard() {
  const [users, setUsers] = useState([]);
  const { userCtx } = useContext(UserContext);

  useEffect(() => {
    io.emit("online", userCtx.user);
    io.on("list", (list) => {
      setUsers(list);
    });
  }, [userCtx]);
  if (users) {
    return (
      <NavBar>
        <Users users={users}/> 
      </NavBar>
    );
  } else {
    return (
      <NavBar>
      </NavBar>
    );
  }
}

export default DashBoard;
