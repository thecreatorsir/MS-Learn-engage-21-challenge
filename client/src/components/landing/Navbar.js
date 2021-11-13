import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <a className='navbar-brand' href='#'>
          MS Learn
        </a>
        <div className='row'>
          <a className='nav-link login-link col-4' href='#'>
            Login
          </a>
          <a className='nav-link register-link col-4' href='#'>
            Register
          </a>
          <a className='nav-link user-link col-4' href='#'>
            User
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
