import React from 'react';
import { Link } from 'react-router-dom';
import store, { getUser, getUsers, getNewUsers, clear, errorHandler, fetchUsers, addUser, deleteUser } from "../store";
import axios from 'axios';

export default class Users extends React.Component{
  constructor(){
    super();
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEvent = this.handleEvent.bind(this)
  };

  componentDidMount(){
    store.dispatch(fetchUsers());
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  };

  componentWillUnmount () {
    this.unsubscribe();
  };

  handleEvent(ev){
    let prop = ev.target.name
    const user = this.state.user
    user[prop] = ev.target.value 
    store.dispatch(getUser(user));
  };

  handleSubmit(ev){
    ev.preventDefault();
    store.dispatch(addUser(this.state.user));
  };

  handleDelete(ev, user){
    ev.preventDefault()
    const users = this.state.users;
    const id = user.id;
    store.dispatch(deleteUser(id,users));
  };

  render(){
    // I can move the form into another component so it can be used multiple times 
    return(
      <div className='container-fluid'>
        <h1>A List of Users</h1>
        <br />
        <form className='form-control' onSubmit={this.handleSubmit}>
          <div>
            <h2> Create a New User </h2>
          </div>
          <div>
            <h6>Please enter your full name and a username (if you dont add a username, I'll make one for you): </h6>
          </div>
          <div className='form-inline'>
            <input className='form-control' name='firstName' value={this.state.user.firstName} onChange={this.handleEvent} placeholder='First Name' /> &nbsp;
            <input className='form-control' name='lastName' value={this.state.user.lastName} onChange={this.handleEvent} placeholder='Last Name' /> &nbsp;      
            <input  className='form-control' name='username' value={this.state.user.username} onChange={this.handleEvent} placeholder='User Name' /> &nbsp;
            <button className='btn btn-primary'> Create </button>
          </div>
        </form>
        {
          this.state.error ? 
          <div id="error-message" className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Oh no!</strong> You need to input a unique name.
            <button onClick={()=> document.getElementById('error-message').remove()} className="close" data-dismiss="alert">
              <span> &times; </span>
            </button>
          </div> : null 
        }
        <ul className="list-group">
          {
            this.state.users.slice(0).reverse().map(user => {
              return ( 
                <Link key={user.id} to={`/users/${user.id}`} style={{textDecoration: 'none', color: 'black'}}>
                  <li className="list-group-item" key={user.id} id='user-box'> 
                    <h6>First Name: {user.firstName}</h6>
                    <h6>Last Name: {user.lastName}</h6>
                    <h6>Username: {user.username}</h6>
                    <button className='btn btn-danger' onClick={(ev) => this.handleDelete(ev, user) }> Delete </button>
                  </li>
                </Link>
              )
            })
          }
        </ul>
      </div>
    );
  };
};
