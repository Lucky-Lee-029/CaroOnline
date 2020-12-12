import './App.css';
import { Route, Redirect, Switch} from 'react-router-dom';
import LoginComponent from './components/Login/Login';
import DashboardComponent from './components/Dashboard/Dashboard';
import GameComponent from './components/Game/Game'

const App=(token)=> {
  return (
    <div>
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
					render={()=>{
						<GameComponent/>
					}}
		></Route>
      </Switch>
    </div>
  );
}

export default App;
