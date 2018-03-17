import { createStore, applyMiddleware } from 'redux';
import  thunkMiddleware  from 'redux-thunk';
import axios from 'axios';

const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';
const WRITE_USER = 'WRITE_USER';
const GOT_NEW_USERS = 'GOT_NEW_USERS';
const CLEAR = 'CLEAR';
const ERROR = 'ERROR';


const initialState = {
  users: [],
  user: '',
  error: ''
};

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case GOT_USERS_FROM_SERVER:
      return Object.assign({}, state, { users: action.users });
    case WRITE_USER:
      return Object.assign({}, state, { user: action.user });
    case GOT_NEW_USERS:
      return Object.assign({}, state, { users: [...state.users, action.users]});
    case CLEAR:
      return Object.assign({}, state, { user:  action.user, error: action.error })
    case ERROR:
      return Object.assign({}, state, { error: action.error })
    default:
      return state;
  };
};

export const getUsers = users => {
  return { type: GOT_USERS_FROM_SERVER, users };
};

export const getUser = user => {
  return { type: WRITE_USER, user: user };
};

export const getNewUsers = users => {
  return { type: GOT_NEW_USERS, users };
}

export const clear = () => {
  return { type: CLEAR,  user: '', error: '' };
};

export const errorHandler = error => {
  return { type: ERROR, error: error }
}

export function fetchUsers() {
  return function thunk (dispatch, getStore){
    return axios.get('/api/users')
      .then( res => res.data )
      .then( users => {
        dispatch(getUsers(users))
      })
      .catch(err => dispatch(errorHandler(err.response.data)))
  } 
}

export const addUser = (user) => {
  return thunk = (dispatch) => {
    return axios.post('/api/users', { name: user })
      .then( res => res.data )
      .then( user => {
        dispatch(getNewUsers(user)) 
        dispatch(clear()) 
      })
      .catch(err => dispatch(errorHandler(err.response.data)))
  }
}

export const deleteUser = (user) => {
  return thunk = (dispatch) => {
    return axios.delete(`/api/users/${user.id}`)
      .then( res => res.data )
      .then( () => {
        const users = this.state.users.filter(_user => _user.id === user.id*1 ? false : true)
        dispatch(getUsers(users)) 
      })
  }
}

export const fetchUser = (id) => {
  return thunk = (dispatch) => {
    return axios.get(`/api/users/${id}`)
      .then( res => res.data )
      .then( user => dispatch(getUser(user.name)))
  }
}

export const updateUser = (id, user) => {
  return thunk = (dispatch) => {
    return axios.put(`/api/users/${this.props.id}`, { name: user })
      .then( res => res.data )
      .then( () => document.location.hash ='/')
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;

