import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./assign.css";
import { getAssignment, submitAssignment } from "../../actions/dashActions";
class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //load the assignment when component mounts to the dom
  componentDidMount() {
    this.props.getAssignment(
      this.props.match.params.id,
      this.props.match.params.aid
    );
  }

  // on chage event handler for setting the state
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // on submit event handler for submitting the assignment
  onSubmit(e) {
    e.preventDefault();
    const newRes = {
      file: this.state.file,
    };
    const check = window.confirm("Assigment is going to be submitted!");
    if (check) {
      this.props.submitAssignment(
        this.props.match.params.id,
        this.props.match.params.aid,
        newRes,
        this.props.history
      );
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='btn btn-primary mt-3'>
          <Link
            to={`/dashboard/subject/${this.props.match.params.id}`}
            className='text-white'
          >
            Back
          </Link>
        </div>
        <div className='user-name mt-5 mb-4 text-white display-5'>
          {this.props.subject.name}
        </div>
        <div className='student-info text-center'>
          <h1 className='assignment-name'>
            {this.props.subject.assignment.name}
          </h1>
          <h5>------------------DISCRIPTION----------------------</h5>
          <p>{this.props.subject.assignment.desc}</p>
          <a href={this.props.subject.assignment._file}>
            Click here to Download or view the assignment
          </a>
          <br />
          <form action='' className='form-group mt-4' onSubmit={this.onSubmit}>
            <label htmlFor='file'>Upload Answer</label>
            <input
              type='url'
              name='file'
              className='form-control'
              onChange={this.onChange}
              value={this.state.file}
            />
            <input type='submit' className='btn btn-success mt-3' />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  subject: state.subject,
});

export default connect(mapStateToProps, { getAssignment, submitAssignment })(
  withRouter(Assignment)
);
