import React, { Component } from "react";
import classname from "classname";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "./auth.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      role: "Teacher",
      name: "",
      email: "",
      password: "",
      subjects: [],
      department: "",
      roll_number: "",
      y_of_passing: "",
      group: "",
      designation: "",
      errors: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // redirect to dashboard if authenticated
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // on change event handler for setting up the local state
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // for the subject multiselect for updating the state with multiple values
  handleChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ subjects: value });
  }

  // on submit event handler for registering the user
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
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { role } = this.state;
    const { errors } = this.props;
    return (
      <div className='auth'>
        <div className='auth-triangle'></div>
        <h2 className='auth-header'>Register</h2>
        <form onSubmit={this.onSubmit} className='auth-container form-group'>
          <p>
            <select
              name='role'
              value={this.state.role}
              onChange={this.onChange}
              className='form-control'
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
              className='form-control'
              required
            />
          </p>
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
              type='text'
              placeholder='Department'
              name='department'
              value={this.state.department}
              onChange={this.onChange}
              className='form-control'
              required
            />
          </p>
          <p>
            <label htmlFor='subjects' className='text-dark'>
              <small>
                {" "}
                Hold down the Ctrl button to select multiple options
              </small>
            </label>
            <select
              name='subjects'
              value={this.state.subjects}
              onChange={this.handleChange}
              className='form-control'
              required
              multiple={true}
            >
              <option value='Cyber Security'>Cyber Security</option>
              <option value='Machine Learning'>Machine Learning</option>
              <option value='Software Engineering'>Software Engineering</option>
            </select>
          </p>
          {/* conditional rendering of the fields based on roles */}
          {role === "Student" ? (
            <>
              <p>
                <input
                  type='number'
                  placeholder='Roll number'
                  name='roll_number'
                  value={this.state.roll_number}
                  className={classname("form-control", {
                    "is-invalid": errors.roll_number,
                  })}
                  onChange={this.onChange}
                />
                {errors.roll_number && (
                  <span className='invalid-feedback'>{errors.roll_number}</span>
                )}
              </p>
              <p>
                <input
                  type='text'
                  placeholder='Group'
                  name='group'
                  className='form-control'
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
                  className='form-control'
                  value={this.state.y_of_passing}
                  onChange={this.onChange}
                />
              </p>
            </>
          ) : (
            ""
          )}
          {role === "Teacher" ? (
            <>
              {" "}
              <p>
                <input
                  type='text'
                  placeholder='Designation'
                  name='designation'
                  value={this.state.designation}
                  className='form-control'
                  onChange={this.onChange}
                />
              </p>
            </>
          ) : (
            ""
          )}

          <p>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              className='form-control'
              onChange={this.onChange}
              required
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
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
