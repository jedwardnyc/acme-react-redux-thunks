import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import store, { getUser, getUsers, getNewUsers, deleteUser } from "../store";
import Users from './Users';
import User from './User';
import axios from 'axios';
import Nav from './Nav';


export default class App extends React.Component{
  constructor(){
    super();
    this.state = store.getState();
  }

  render(){
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
}