import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <Link className='navbar-brand' to='/'>
          MS Learn
        </Link>
        <div className='row'>
          <Link className='nav-link login-link col-4' to='/login'>
            Login
          </Link>
          <Link className='nav-link register-link col-4' to='register'>
            Register
          </Link>
          <Link className='nav-link user-link col-4' to='/profile'>
            User
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
