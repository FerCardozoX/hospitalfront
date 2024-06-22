import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import MenuMedico from './MenuMedico';
import MenuAdmin from './MenuAdmin';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/menu-medico" component={MenuMedico} />
        <Route path="/menu-admin" component={MenuAdmin} />
      </Switch>
    </Router>
  );
}

export default App;

