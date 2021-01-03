import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
import UserCtx from './context/User';

function App() {
  const userState = useState();

  return (
    <UserCtx.Provider value={userState}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </UserCtx.Provider >
  );
}

export default App;