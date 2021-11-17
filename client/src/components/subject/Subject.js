import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSubject, uploadAssignment } from "../../actions/dashActions";

const getAssignment = (assignments, condition) => {
  if (assignments && Object.keys(assignments).length > 0) {
    return assignments.map((assign) => {
      if (assign.due === condition) {
        return (
          <a
            className='list-group-item list-group-item-action'
            href='#list-item-1'
            key={assign._id}
          >
            {assign.name}
          </a>
        );
      } else return "";
    });
  }
  return "";
};

class Subject extends Component {
  //get the subject everytime the component loads
  constructor() {
    super();
    this.state = {
      name: "",
      desc: "",
      file: "",
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
    const newAssignment = {
      name: this.state.name,
      desc: this.state.desc,
      file: this.state.file,
    };
    console.log(newAssignment);
    const check = window.confirm("Assigment is going to be uploaded!");
    if (check) {
      this.props.uploadAssignment(
        this.props.match.params.id,
        newAssignment,
        this.props.history
      );
    }
  }

  componentDidMount() {
    this.props.getSubject(this.props.match.params.id);
  }
  render() {
    const { role } = this.props.auth.user;
    const { name, assignments } = this.props.subject.subject;
    let showForm = "";
    let dueAssignment = getAssignment(assignments, true);

    let gradingAssignment = "";
    let gradedAssignment = getAssignment(assignments, false);

    if (role === "Teacher") {
      showForm = (
        <div className='file-container'>
          <form className='mt-4 form-group' onSubmit={this.onSubmit}>
            <label htmlFor='name'>
              <small>Assignment Name</small>
            </label>
            <input
              type='text'
              name='name'
              className='form-control'
              onChange={this.onChange}
              value={this.state.name}
            />
            <label htmlFor='desc'>
              <small>Assignment Description</small>
            </label>
            <input
              type='text'
              name='desc'
              className='form-control'
              onChange={this.onChange}
              value={this.state.desc}
            />
            <label htmlFor='file'>
              <small>Upload Assignment on Gdrive and paste link here</small>
            </label>
            <input
              type='text'
              name='file'
              className='form-control'
              onChange={this.onChange}
              value={this.state.file}
            />
            <input type='submit' className='btn btn-success mt-2 btn-block' />
          </form>
        </div>
      );
    }
    return (
      <div className='container'>
        <div className='btn btn-primary mt-3'>
          <Link to='/dashboard' className='text-white'>
            Back
          </Link>
        </div>
        <h1 className='user-name mt-5 mb-4 text-white display-5'>{name}</h1>
        {showForm}
        <div className='due-assignments mt-5'>
          <div className='jumbotron'>
            <div className='h1 text-center text-dark'>Due Assignments</div>
            <div className='list-group assignment-list mt-2'>
              {dueAssignment}
            </div>
          </div>
        </div>
        {role === "Student" ? (
          <div className='due-assignments mt-5'>
            <div className='jumbotron'>
              <div className='h1 text-center text-dark'>
                Grading in Progress
              </div>
              <div className='list-group assignment-list mt-2'>
                {gradingAssignment}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className='due-assignments mt-5'>
          <div className='jumbotron'>
            <div className='h1 text-center text-dark'>Graded Assignments</div>
            <div className='list-group assignment-list mt-2'>
              {gradedAssignment}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  subject: state.subject,
});

export default connect(mapStateToProps, { getSubject, uploadAssignment })(
  Subject
);
