import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Users from './Users';
import User from './User';
// If I end up wanting a Nav
// import Nav from './Nav';

  
const App = () => {
  
    return (
      <div>
        <Router>
        <div>
        {/* <Nav /> */}
          <div>
            <Route path='/' exact render = { () => <Users/>}/>
            <Route path='/users/:id' render = { ({ match }) => <User id={match.params.id} /> }/>
          </div>
        </div>  
        </Router>
      </div>
    )
  }

  export default App;
