import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { UserContext } from './contexts';
import axios from 'axios';
import DashBoard from './components/DashBoard';
import SignIn from './components/SignIn';

function ProtectedRoute(props) {
  const { userCtx } = useContext(UserContext);

  return (
    <Route
      path={props.path}
      exact
      render={
        data => userCtx.user ?
          <props.component {...data} /> : <Redirect to="/login" />
      }
    />
  );
}

function App() {
  const [userCtx, setUserCtx] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setUserCtx({
            is_auth: true,
            user: null,
          });
          return;
        }
        
        const res = await axios.get(process.env.REACT_APP_API_URL + "/auth/admin", {
          headers: {
            "x-auth-token": token
          }
        });
        setUserCtx({
          is_auth: true,
          user: res.data.body
        });
      } catch (err) {
        localStorage.removeItem("access_token");
        setUserCtx({
          is_auth: true,
          user: null,
        });
      }
    })();
  }, []);

  if (userCtx.is_auth) {
    return (
      <UserContext.Provider value={
        { userCtx, setUserCtx }
      }>
        <BrowserRouter>
          <ProtectedRoute path="/" component={DashBoard} />
          <Route path="/login" component={SignIn} />
        </BrowserRouter>
      </UserContext.Provider>
    );
  } else {
    return null;
  }
}

export default App;
