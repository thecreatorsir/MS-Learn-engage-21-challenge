import React, { Component } from "react";
import axios from "axios";
import "./auth.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      role: "Teacher",
      name: "",
      email: "",
      password: "",
      subjects: "",
      department: "",
      roll_number: "",
      y_of_passing: "",
      group: "",
      designation: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const newUser = {};
    newUser.role = this.state.role;
    newUser.name = this.state.name;
    newUser.email = this.state.email;
    newUser.department = this.state.department;
    newUser.subjects = this.state.subjects;
    newUser.password = this.state.password;
    if (this.state.roll_number !== "") {
      newUser.roll_number = this.state.roll_number;
    }
    if (this.state.designation !== "") {
      newUser.designation = this.state.designation;
    }
    if (this.state.y_of_passing !== "") {
      newUser.y_of_passing = this.state.y_of_passing;
    }
    if (this.state.group !== "") {
      newUser.group = this.state.group;
    }

    try {
      const res = await axios.post("/api/users/register", newUser);
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  render() {
    return (
      <div className='auth'>
        <div className='auth-triangle'></div>
        <h2 className='auth-header'>Register</h2>
        <form onSubmit={this.onSubmit} className='auth-container'>
          <p>
            <select
              name='role'
              value={this.state.role}
              onChange={this.onChange}
            >
              <option>Teacher</option>
              <option>Student</option>
            </select>
          </p>
          <p>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
            />
          </p>
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
              type='text'
              placeholder='Department'
              name='department'
              value={this.state.department}
              onChange={this.onChange}
            />
          </p>
          <p>
            <input
              type='text'
              placeholder='Subjects'
              name='subjects'
              value={this.state.subjects}
              onChange={this.onChange}
            />
          </p>

          <p>
            <input
              type='number'
              placeholder='Roll number'
              name='roll_number'
              value={this.state.roll_number}
              onChange={this.onChange}
            />
          </p>
          <p>
            <input
              type='text'
              placeholder='Group'
              name='group'
              value={this.state.group}
              onChange={this.onChange}
            />
          </p>
          <p>
            <input
              type='number'
              placeholder='Graduation Year'
              min='2022'
              max='2025'
              name='y_of_passing'
              value={this.state.y_of_passing}
              onChange={this.onChange}
            />
          </p>
          <p>
            <input
              type='text'
              placeholder='Designation'
              name='designation'
              value={this.state.designation}
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

export default Register;
