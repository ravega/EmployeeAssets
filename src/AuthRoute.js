import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    props.isLoggedIn === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default AuthRoute;
