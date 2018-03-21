import { createStore, applyMiddleware } from 'redux';
import  thunkMiddleware  from 'redux-thunk';
import axios from 'axios';
import faker from 'faker';

const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';
const WRITE_USER = 'WRITE_USER';
const GOT_NEW_USERS = 'GOT_NEW_USERS';
const CLEAR = 'CLEAR';
const ERROR = 'ERROR';

// State of application should only need users (or users/products) try to remove user and error from here and move elsewhere
const initialState = {
  users: [],
  user: {
    firstName: '',
    lastName: '',
    username: '',
  },
  error: '',
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
      return Object.assign({}, state, { error: action.error });
    default:
      return state;
  };
};

export const getUsers = users => {
  return { type: GOT_USERS_FROM_SERVER, users };
};

export const getUser = user => {
  return { type: WRITE_USER, user };
};

export const getNewUsers = users => {
  return { type: GOT_NEW_USERS, users };
}

export const clear = () => {
  return { type: CLEAR,  user: {firstName: '', lastName: '', username: ''}, error: '' };
};

export const errorHandler = error => {
  return { type: ERROR, error: error };
};

export function fetchUsers() {
  return function thunk (dispatch, getStore){
    return axios.get('/api/users')
      .then( res => res.data )
      .then( users => {
        dispatch(getUsers(users));
      })
      .catch(err => dispatch(errorHandler(err.response.data)))
  }; 
};

export function addUser(user){
  if(!user.username){
    user.username = faker.internet.userName(user.firstName, user.lastName)
  }
  return function thunk (dispatch, getStore){
    return axios.post('/api/users',  user )
      .then( res => res.data )
      .then( user => {
        dispatch(getNewUsers(user));
        dispatch(clear())
      })
      .catch(err => dispatch(errorHandler(err.response.data)))
  };
};

export function deleteUser(id, users){
  return function thunk (dispatch, getStore){
    return axios.delete(`/api/users/${id}`)
      .then( res => res.data )
      .then( () => {
        const _users = users.filter(_user => _user.id === id*1 ? false : true);
        dispatch(getUsers(_users));
      })
      .catch(err => dispatch(errorHandler(err.response.data)))
  };
};

export function fetchUser(id){
  return function thunk (dispatch, getStore){
    return axios.get(`/api/users/${id}`)
      .then( res => res.data )
      .then( user => dispatch(getUser(user)))
      .catch( err => dispatch(errorHandler(err.response.data )))
  };
};

export function updateUser(id, user){
  if(!user.username){
    user.username = faker.internet.userName(user.firstName, user.lastName)
  }
  return function thunk (dispatch, getStore){
    return axios.put(`/api/users/${id}`, user)
      .then( res => res.data )
      .then( () => document.location.hash ='/')
      .catch(err => dispatch(errorHandler(err.response.data)))
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;

