import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
  logoutClick(e) {
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authlink = (
      <div className='auth-link-container col-md-12'>
        <a
          className='btn btn-light btn-sm mr-3'
          href='https://ms-learn-lets-discuss.herokuapp.com/'
          target='_blank'
          rel='noreferrer'
        >
          Discuss With Peers
        </a>
        <span>
          ({user.name}-{user.role})
        </span>
        <Link
          className='nav-link register-link'
          style={{ display: "inline" }}
          to='/login'
          onClick={(e) => this.logoutClick(e)}
        >
          Logout
        </Link>
      </div>
    );
    const guestlink = (
      <>
        <Link className='nav-link login-link col-6' to='/login'>
          Login
        </Link>
        <Link className='nav-link register-link col-6' to='/register'>
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
