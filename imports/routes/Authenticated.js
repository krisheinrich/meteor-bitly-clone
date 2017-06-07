import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom';


const Authenticated = ({ isLoggingIn, isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    // Display nothing during log-in transition
    if (isLoggingIn) return <div></div>;
    // Display component if user is authenticated, else redirect to log-in page
    const newProps = { ...props, isLoggingIn, isAuthenticated };
    return (isAuthenticated) ?
    (<Component {...newProps} />) :
    (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
  }}/>
);

Authenticated.propType = {
  isLoggingIn: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func
};

export default Authenticated;
