import React from 'react';
import store, { getUser, clear, fetchUser, updateUser } from "../store";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class User extends React.Component{
  constructor(){
    super();
    this.state = store.getState();
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    const id = this.props.id;
    store.dispatch(fetchUser(id))
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
    const id = this.props.id;
    store.dispatch(updateUser(id, user));
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