import * as ActionTypes from '../actions';
import merge from 'lodash/object/merge';
// import paginate from './paginate';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import auth from './auth';
import * as constants from '../constants';
import { RCV_PROXIES } from '../actions';
// const socket = io.connect('http://localhost:8080');
const socket = io.connect('http://104.155.44.221:8080');
import Immutable from 'immutable';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { proxies: [] }, action) {
  // TODO:
  // here would be a perfect place to store the id's for these entities as well
  // they are stored in the result field of the response, which is on the action property
  // soooo.... based on the action and which entity it is for we can then fill in the
  // id's for these entities, or rather merge them with the existing id's basd on the actual action
  // sounds like something too specific to do in here, needs more thinking to perfection

  if (action.response && action.response.entities) {
    // console.log('Entities reducer is returning a new state ' + JSON.stringify(action.response.entities));
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}


// // Updates the pagination data for different actions.
// const pagination = combineReducers({
//   starredByUser: paginate({
//     mapActionToKey: action => action.login,
//     types: [
//       ActionTypes.STARRED_REQUEST,
//       ActionTypes.STARRED_SUCCESS,
//       ActionTypes.STARRED_FAILURE
//     ]
//   }),
//   stargazersByRepo: paginate({
//     mapActionToKey: action => action.fullName,
//     types: [
//       ActionTypes.STARGAZERS_REQUEST,
//       ActionTypes.STARGAZERS_SUCCESS,
//       ActionTypes.STARGAZERS_FAILURE
//     ]
//   })
// });

function proxyIDs(state = [], action) {
  if (action.type == RCV_PROXIES) {
    socket.emit('proxydata', action.data);
    return action.response.result;
  } else {
    return state;
  }
}

function proxyCounters(state = Immutable.Map(), action) {
  if(action.type == 'RCV_PROXY_COUNTERS') {
      // console.log('action proxy counters with data ' + JSON.stringify(state));
      //if(state.counters[action.proxycounters.id]) console.log('Old state found');
      //return Object.assign({}, state, action.proxycounters);
      return state.set(action.proxycounters.id, {key: action.proxycounters.id, payload: action.proxycounters});
  } else {
    return state;
  }
}

// TODO:
// we need to introduce reducers for every different entity being recevied
// so as to enable the user-interface to respond to those asynchronous changes.
// this means for proxies we create a reducer for the action RCV_PROXIES, which
// will return a new state object where the proxies are inserted into the state
// even though this is redundant as it has already been done by the entities reducer function
// above.

const rootReducer = combineReducers({
  entities,
  errorMessage,
  router,
  auth: auth,
  proxyIDs,
  proxyCounters
});

export default rootReducer;
