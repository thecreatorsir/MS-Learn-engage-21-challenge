import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//Boilerplate code to impliment the private routes in the application
//very important form the security point of view
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
);
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
