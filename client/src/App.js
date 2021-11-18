import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/landing/Navbar";
import Landing from "./components/landing/Landing";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Footer from "./components/landing/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import Subject from "./components/subject/Subject";
import Assignment from "./components/assignment/Assignment";
import Response from "./components/assignment/Response";
import Grading from "./components/assignment/Grading";
//check for user token
if (localStorage.jwtToken) {
  //set AuthToken Header
  setAuthToken(localStorage.jwtToken);
  //decode the token and get the user
  const decoded = jwt_decode(localStorage.jwtToken);
  //set the user
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currtime = Date.now() / 1000;

  if (decoded.exp < currtime) {
    //logout user
    store.dispatch(logoutUser());

    //redirect to login page
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Switch>
              <Route exact path='/'>
                <Landing />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/dashboard/subject/:id'
                component={Subject}
              />
              <PrivateRoute
                exact
                path='/dashboard/subject/:id/assignment/:aid'
                component={Assignment}
              />
              <PrivateRoute
                exact
                path='/dashboard/subject/:id/assignment/:aid/responses'
                component={Response}
              />
              <PrivateRoute
                exact
                path='/dashboard/subject/:id/assignment/:aid/responses/:res_id'
                component={Grading}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
