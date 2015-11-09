import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import HomePage from './containers/HomePage';
// import UserPage from './containers/UserPage';
// import RepoPage from './containers/RepoPage';

// export default function routes(store) {
//   const requireLogin = (nextState, replaceState) => {
//     const isLoggedIn = !!store.getState().auth.token;
//     console.log('User is not logged in, replacing route data');
//     if (!isLoggedIn) {
//       replaceState(null, "/");
//     }
//   };
//
//   return (
//     <Route path="/" component={App}>
//       <IndexRoute component={HomePage}/>
//         <Route path="/dashboard" component={Dashboard}/>
//     </Route>
//   );
// };
/*
<Route  onEnter={requireLogin}>
  <Route path="/dashboard" component={Dashboard}/>
</Route>


<Route path="/:login/:name"
       component={RepoPage} />
<Route path="/:login"
       component={UserPage} />*/

export default  <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
        <Route path="/dashboard" component={Dashboard}/>
    </Route>
