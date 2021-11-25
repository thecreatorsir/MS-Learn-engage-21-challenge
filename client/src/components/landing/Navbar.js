import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  logoutUser,
  getNotifications,
  clearNotifications,
} from "../../actions/authActions";
class Navbar extends Component {
  componentDidMount() {
    this.props.getNotifications(this.props.auth.user.id);
  }

  clearNotif(e) {
    this.props.clearNotifications(this.props.auth.user.id);
  }
  logoutClick(e) {
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    // auth links of the authenticated users
    const authlink = (
      <div className='auth-link-container'>
        <span className='mr-2'>
          <button
            type='button'
            className='btn btn-light btn-sm'
            data-toggle='modal'
            data-target='.bd-example-modal-sm'
          >
            Notifications ({this.props.auth.notifications.length})
          </button>
          <div
            className='modal fade bd-example-modal-sm'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='mySmallModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-sm'>
              <div className='modal-content text-dark'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Notifications
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                    onClick={(e) => this.clearNotif(e)}
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <ul className='list-group'>
                    {this.props.auth.notifications.map((notify, index) => (
                      <li className='list-group-item' key={index}>
                        {notify}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </span>
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
    // guest links for unauthenticated users
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
export default connect(mapStateToProps, {
  logoutUser,
  getNotifications,
  clearNotifications,
})(Navbar);
