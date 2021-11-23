import React, { Component } from "react";
import classname from "classname";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import "./auth.css";
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // redirect to dashboard once login
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  // handling statechange and mapping errror to local state
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  // on change event for setting the local state
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // on submit event handler for login the user
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(newUser);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className='auth'>
        <div className='auth-triangle'></div>
        <h2 className='auth-header'>Log in</h2>
        <form className='auth-container from-group' onSubmit={this.onSubmit}>
          <p>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
              className={classname("form-control", {
                "is-invalid": errors.email,
              })}
              required
            />
            {errors.email && (
              <span className='invalid-feedback'>{errors.email}</span>
            )}
          </p>
          <p>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
              className={classname("form-control", {
                "is-invalid": errors.password,
              })}
              required
            />
            {errors.password && (
              <span className='invalid-feedback'>{errors.password}</span>
            )}
          </p>
          <p>
            <input type='submit' />
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
