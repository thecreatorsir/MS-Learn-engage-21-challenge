import React, { Component } from "react";
import "./auth.css";
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(newUser);
  }
  render() {
    return (
      <div className='auth'>
        <div className='auth-triangle'></div>
        <h2 className='auth-header'>Log in</h2>
        <form className='auth-container' onSubmit={this.onSubmit}>
          <p>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
            />
          </p>
          <p>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
            />
          </p>
          <p>
            <input type='submit' />
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
