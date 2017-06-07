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

// Connect the routes component to the Meteor Tracker
const getTrackerLoader = (reactiveMapper) => {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
      	// assign the custom clean-up function
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
};

// Specify the authenication props to pass down to the components (used by
// Authenticated and Public routes to redirect user if needed)
const reactiveMapper = (props, onData) => {
  const isLoggingIn = Meteor.loggingIn();
  onData(null, {
    isLoggingIn,
    isAuthenticated: !isLoggingIn && !!Meteor.userId()
  });
};

// Export connected container component
export default compose(getTrackerLoader(reactiveMapper))(routes);
