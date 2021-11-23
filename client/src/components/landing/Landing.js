import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export class Landing extends Component {
  // redireting to dashboard if authenticated
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className='landing'>
        <div className='landing-content'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-md-3 mb-4'>MS Learn</h1>
              <p className='lead'>
                A common platform for both teacher and student to make their
                lifes easy. Upload assignments, discuss doubts on the go and
                many more....
              </p>
              <hr />

              <Link to='/register' className='btn btn-md-lg btn-primary mr-2'>
                Register
              </Link>
              <Link to='/login' className='btn btn-md-lg btn-light'>
                {" "}
                Login{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(Landing));
