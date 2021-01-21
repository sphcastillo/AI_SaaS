import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import FourOhFour from './components/FourOhFour';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>

        {/* The Switch makes sure that only a single one of the child Routes can be accessed. */}
        <Switch> 
          <Route exact path='/' component={Home} />

          <Route exact path='/login' component={Login} />

          {/* Since this route is not an 'exact' path, it will be accessed by any route starting with '/'.
          In effect, any route that isn't listed above will return the 404 page error. */}
          <Route path='/' component={FourOhFour} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
