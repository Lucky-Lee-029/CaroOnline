import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
import SignUp from './components/SignUp/SignUp';
import ReviewGame from './components/ReviewMatch/ReviewGame';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers/rootReducers';
import UserCtx from './context/User';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ChangePassword from './components/ForgotPassword/ChangePassword';

function saveToLocalStorage(state) {
  try {
    if (state.roomReducers.roomInfo) {
      localStorage.setItem('state', JSON.stringify(state));
    }
    else {
      localStorage.setItem('state', null);
    }
  } catch (err) {
    console.log('Error when call function saveToLocalStorage()', err);
  }
}

// Function load state
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState || serializedState === 'null') return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error when call function loadFromLocalStorage()', err);
    return undefined;
  }
}
const persistedState = loadFromLocalStorage();
const store = createStore(
  rootReducers,
  persistedState,
  applyMiddleware(
    thunkMiddleware
  )
);
store.subscribe(() => saveToLocalStorage(store.getState()));

function SendEmail(props) {
  const history = useHistory();

  useEffect(() => {
    (async function () {
      try {
        const token = await props.match.params.token;
        const res = await axios.put(`http://localhost:8000/users_api/user/verify_email/${token}`);
        const obj = await res.data;
        if (obj) {
          history.push('/');
        }
      } catch (err) {
      }
    })();
  })

  return null;
}

function App() {
  const userState = useState();

  return (
    <UserCtx.Provider value={userState}>
      <BrowserRouter>
        <Switch>
          <Route path="/review" component={ReviewGame} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route exact path="/forgot_password/:token" component={ChangePassword} />
          <Route exact path='/verify_email/:token' component={SendEmail} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={DashBoard} />
        </Switch>
      </BrowserRouter>
    </UserCtx.Provider >
  );
}

export default App;