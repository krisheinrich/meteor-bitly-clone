import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { compose } from 'react-komposer';

import Authenticated from './Authenticated';
import Public from './Public';

import Link from '../ui/Link';
import SignUp from '../ui/SignUp';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

// // Factory for creating access-controlled routes
// const CustomRoute = (accessCondition, redirectPath) => {
//   return ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//       (eval(accessCondition)) ? (
//         <Component {...props}/>
//       ) : (
//         <Redirect to={{
//           pathname: redirectPath,
//           state: { from: props.location }
//         }}/>
//       )
//     )}/>
//   );
// };
//
// // Restrict access and force redirect based on user's authentication state
// // accessCondition is passed in as a string so that it can be evaluated more than once
// const PrivateRoute = CustomRoute( '!!Meteor.userId()', '/' )
// const PublicRoute = CustomRoute( '!Meteor.userId()', '/links' );

const routes = (appProps) => (
  <Router>
    <Switch>
      <Public exact path="/" component={Login} {...appProps} />
      <Public path="/signup" component={SignUp} {...appProps} />
      <Authenticated exact path="/links" component={Link} {...appProps} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

const getTrackerLoader = (reactiveMapper) => {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
      	// assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
};

const reactiveMapper = (props, onData) => {
  const isLoggingIn = Meteor.loggingIn();
  onData(null, {
    isLoggingIn,
    isAuthenticated: !isLoggingIn && !!Meteor.userId()
  });
};

export default compose(getTrackerLoader(reactiveMapper))(routes);
