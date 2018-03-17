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
  }

  componentDidMount(){
    // axios.get('/api/users')
    //   .then( res => res.data )
    //   .then( users => {
    //     store.dispatch(getUsers(users))
    //   })
    //   .catch(err => store.dispatch(errorHandler(err.response.data)))
    store.dispatch(fetchUsers())
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe();
  };
  
  handleEvent(ev){
    store.dispatch(getUser(ev.target.value))
  }

  handleSubmit(ev){
    ev.preventDefault()
    const user = this.state.user;
    // axios.post('/api/users', { name: user })
    //   .then( res => res.data )
    //   .then( user => {
    //     store.dispatch(getNewUsers(user)) 
    //     store.dispatch(clear()) 
    //   })
    //   .catch(err => store.dispatch(errorHandler(err.response.data)))
    store.dispatch(addUser(user));
  }

  handleDelete(ev, user){
    ev.preventDefault()
    // axios.delete(`/api/users/${user.id}`)
    //   .then( res => res.data )
    //   .then( () => {
    //     const users = this.state.users.filter(_user => _user.id === user.id*1 ? false : true)
    //     store.dispatch(getUsers(users)) 
    //   })
    store.dispatch(deleteUser(user))
  }

  render(){
    return(
      <div className='container-fluid'>
        <h1>Users</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-control form-control-lg'>
          <input value={this.state.user} onChange={this.handleEvent} placeholder='User Name' />
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
            this.state.users.map(user => {
              return ( 
                <li className="list-group-item" key={user.id}> 
                  <Link to={`/users/${user.id}`} style={{color: 'black'}}><h4>{user.name}</h4></Link>
                  <button className='btn btn-danger' onClick={(ev) => this.handleDelete(ev, user) }> Delete </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
