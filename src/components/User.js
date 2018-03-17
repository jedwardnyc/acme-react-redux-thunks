import React from 'react';
import store, { getUser, clear } from "../store";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class User extends React.Component{
  constructor(){
    super();
    this.state = store.getState();
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.id}`)
      .then( res => res.data )
      .then( user => store.dispatch(getUser(user.name)))
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  }

  componentWillUnmount(){
    this.unsubscribe();
    store.dispatch(clear())
  }

  handleEvent(ev){
    store.dispatch(getUser(ev.target.value))
  }
  

  update(ev){
    ev.preventDefault();
    const user = this.state.user;
    axios.put(`/api/users/${this.props.id}`, { name: user })
      .then( res => res.data )
      .then( () => document.location.hash ='/')
  }

  render(){
    return(
      <div className='container-fluid'>
        <h1>Update User? </h1>
        <br />
        <form onSubmit={this.update}>
          <input 
            value={this.state.user}
            onChange={this.handleEvent}
           />
           <br />
           <br />
          <button className='btn btn-success'> Update </button>
          <button 
            onClick={() => store.dispatch(clear())} 
            className='btn btn-danger'> <Link to='/' style={{ color: "white" }}> Cancel </Link></button>
        </form>
      </div>
    );
  };
}