import './App.css';
import React, { useState } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import LoginComponent from './components/Login/Login';
import DashboardComponent from './components/Dashboard/Dashboard';
import Game from './components/Game/Game';
import Profile from './components/Profile/Profile'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducers';
import { UserContext } from './context';


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



const App=(token)=> {
    const [userCtx, setUserCtx] = useState({});
    return (
        <div>
            <UserContext.Provider value={
                {userCtx,setUserCtx}
            }>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() =>
                            <LoginComponent />
                        }
                    />
                    <Route
                        path="/dashboard"
                        render={() =>
                            <DashboardComponent/> 
                        }
                    />
                    <Route
                        path="/game"
                        render={()=>
                            <Game/>
                        }
                    ></Route>
                    <Route
                        path="/profile"
                        render={() =>
                            <Profile/> 
                        }
                    />
                </Switch>
            </UserContext.Provider>
        </div>
  );
}

export default App;

serviceWorker.unregister();