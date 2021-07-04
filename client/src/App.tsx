import React from 'react';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
