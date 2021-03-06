import React from 'react';
import store, { getUser, clear, fetchUser, updateUser } from "../store";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class User extends React.Component{
  constructor(){
    super();
    this.state = store.getState();
    this.update = this.update.bind(this);
    this.handleEvent = this.handleEvent.bind(this)
  };

/* starting to remove user from global state. It should be located here only
  constructor(){
    super();
    const user = store.getState().users.filter(user => user.id === this.props.id * 1)
    this.state = {
      user: user ? user : ''
      // store.getState();
    }
    this.update = this.update.bind(this);
    this.handleEvent = this.handleEvent.bind(this)
  };
*/

  componentDidMount(){
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
    const id = this.props.id;
    store.dispatch(fetchUser(id));
  };

  componentWillUnmount(){
    this.unsubscribe();
    store.dispatch(clear());
  };

  handleEvent(ev){
    const prop = ev.target.name
    const user = this.state.user
    user[prop] = ev.target.value 
    store.dispatch(getUser(user));
  };
  
  update(ev){
    ev.preventDefault();
    const userName = this.state.user;
    const id = this.props.id;
    store.dispatch(updateUser(id, userName));
  };

  render(){
    
    return(
      <div className='container-fluid'>
        <h1>Update User? </h1>
        <br />
        <form onSubmit={this.update}>
          <label>First Name: </label>
          <input  className='form-control' name='firstName' value={this.state.user.firstName} onChange={this.handleEvent} placeholder='First Name' />
          <label>Last Name: </label>
          <input  className='form-control' name='lastName' value={this.state.user.lastName} onChange={this.handleEvent} placeholder='Last Name' />
          <label>Username: </label>
          <input  className='form-control' name='username' value={this.state.user.username} onChange={this.handleEvent} placeholder='User Name' />
          <br />
          <button disabled={ this.state.user.lastName.length === 0 || this.state.user.firstName.length === 0 ? true : false }  className='btn btn-success'> Update </button>
          {/* &nbsp; will add a REAL space. Not just whitespace */}
          &nbsp;&nbsp;
          <button onClick={(ev) => ev.preventDefault()} className='btn btn-danger'>
            <Link to='/' style={{ color: "white" }}> Cancel </Link>
          </button>
        </form>
      </div>
    );
  };
};