import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import AdminCtx from './context/Admin';
import DashBoard from './components/DashBoard';
import SignIn from './components/SignIn';

function App() {
  const adminState = useState();

  return (
    <AdminCtx.Provider value={adminState}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/" component={DashBoard} />
        </Switch>
      </BrowserRouter>
    </AdminCtx.Provider>
  );
}

export default App;
