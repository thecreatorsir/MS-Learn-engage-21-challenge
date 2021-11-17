import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
  logoutClick(e) {
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const authlink = (
      <Link
        className='nav-link register-link col-4'
        to='/login'
        onClick={(e) => this.logoutClick(e)}
      >
        Logout
      </Link>
    );
    const guestlink = (
      <>
        <Link className='nav-link login-link col-4' to='/login'>
          Login
        </Link>
        <Link className='nav-link register-link col-4' to='/register'>
          Register
        </Link>
      </>
    );
    return (
      <nav className='navbar'>
        <Link className='navbar-brand' to='/'>
          MS Learn
        </Link>
        <div className='row'>{isAuthenticated ? authlink : guestlink}</div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
