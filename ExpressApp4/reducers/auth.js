import * as constants from '../constants';
import createReducer from '../utils/create-reducer'

const initialState = {
  token: null,
  user: { }
}

export default function auth(state = initialState, action) {
  // console.log('inside state reducer for authorisation ');
  switch (action.type) {
    case constants.LOG_OUT:
      // console.log("Auth::loggedOUT!!!" + JSON.stringify(state));
      return Object.assign({}, state, { token: null });
    case constants.LOGGED_IN:

      if (state.token != action.tokenID) {
        // console.log("Auth::loggedin chaging state object" + JSON.stringify(action));
        var newstate = Object.assign({}, state, { token: action.tokenID });
        // console.log("Auth::loggedin state now has " + JSON.stringify(newstate));

        return newstate;
      } else return state;
    default:
      return state;
  }
  return state;
}
