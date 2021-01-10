import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import SignUp from './components/SignUp/SignUp';
import Game from './components/Game/Game';
import ReviewGame from './components/ReviewMatch/ReviewGame'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import ReactDOM from 'react-dom';
import rootReducers from './reducers/rootReducers';
import UserCtx from './context/User';
import { AppBar } from '@material-ui/core';
import Chart from './components/Chart/Chart';

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


function App() {
  const userState = useState();

  return (
    <UserCtx.Provider value={userState}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/" component={DashBoard} />
          <Route path="/chart" component={Chart} />
          <Route path="/profile" component={Profile} />
          <Route path="/game" component={Game} />
          <Route path="/review" component={ReviewGame} />
        </Switch>
      </BrowserRouter>
    </UserCtx.Provider >
  );
}

export default App;