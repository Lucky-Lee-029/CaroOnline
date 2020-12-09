import './App.css';
import { Route, Redirect, Switch} from 'react-router-dom';
import LoginComponent from './components/Login/Login';
import DashboardComponent from './components/Dashboard/Dashboard';

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
					exact
					path="/dashboard"
					render={() =>
						<DashboardComponent/> 
					}
				/>
      </Switch>
    </div>
  );
}

export default App;
