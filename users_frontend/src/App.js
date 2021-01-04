import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
//import Profile from './components/Profile/Profile'
import UserCtx from './context/User';
import SignUp from './components/SignUp/SignUp'
import Chart from './components/Chart/Chart'

function App() {
  const userState = useState();

  return (
    <UserCtx.Provider value={userState}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/chart" component={Chart} />
        </Switch>
      </BrowserRouter>
    </UserCtx.Provider >
  );
}

export default App;