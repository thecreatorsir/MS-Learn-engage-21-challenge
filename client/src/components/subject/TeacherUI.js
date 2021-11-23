import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AssignContainer from "./AssignContainer";
import {
  uploadAssignment,
  deleteAssignment,
  updateAssignmentStatus,
} from "../../actions/dashActions";
import del from "../../img/delete.jpg";
import tick from "../../img/tick.jpg";
import "./sub.css";
class TeacherUI extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      desc: "",
      file: "",
      toggle: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickUpdateStatus = this.onClickUpdateStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getAssignment = this.getAssignment.bind(this);
  }
  // function to get teacher assigmnent based in diffrent checks
  getAssignment(assignments, chk) {
    if (assignments && Object.keys(assignments).length > 0) {
      return assignments.map((assign) => {
        let url = `/dashboard/subject/${this.props.id}/assignment/${assign._id}/responses`;
        // getting due assignments
        if (assign.due === true && chk === "due") {
          return (
            <Link
              to={url}
              className='list-group-item list-group-item-action'
              key={assign._id}
            >
              {assign.name}
              <span style={{ float: "right" }}>
                <img
                  src={tick}
                  alt='mark as graded'
                  className='mr-2'
                  title='mark as graded'
                  onClick={(e) => {
                    this.onClickUpdateStatus(e, assign._id);
                  }}
                />
                <img
                  src={del}
                  alt='delete assignment'
                  title='delete assignment'
                  onClick={(e) => {
                    this.onClickDelete(e, assign._id);
                  }}
                />
              </span>
            </Link>
          );
        }
        // getting graded assignments
        else if (assign.due === false && chk === "graded")
          return (
            <div
              className='list-group-item list-group-item-action'
              key={assign._id}
              title='not editable'
            >
              {assign.name}
            </div>
          );
        return "";
      });
    }
    return "";
  }

  // on click event handler for deleting the assignment
  onClickDelete(e, aid) {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure! This will delete the assignment permanently"
      )
    ) {
      this.props.deleteAssignment(this.props.id, aid);
    }
  }

  // on click event handler for updating the status of the assigment
  onClickUpdateStatus(e, aid) {
    e.preventDefault();
    if (window.confirm("Are you sure! This will be mark as completed")) {
      this.props.updateAssignmentStatus(this.props.id, aid);
    }
  }

  // on change event handler of setting up the local state
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // on submit event handler for uploading the new assignment
  onSubmit(e) {
    e.preventDefault();
    const newAssignment = {
      name: this.state.name,
      desc: this.state.desc,
      file: this.state.file,
    };

    const check = window.confirm("Assigment is going to be uploaded!");
    if (check) {
      this.props.uploadAssignment(this.props.id, newAssignment);
    }
  }

  // on click event handler for toggling the upload button
  onClick() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  }

  render() {
    const { assigns } = this.props;
    const dueAssignment = this.getAssignment(assigns, "due");
    const gradedAssignment = this.getAssignment(assigns, "graded");

    // redering the assignment upload form
    const showForm = (
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
            required
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
            required
          />
          <label htmlFor='file'>
            <small>Upload Assignment on Gdrive and paste link here</small>
          </label>
          <input
            type='url'
            name='file'
            className='form-control'
            onChange={this.onChange}
            value={this.state.file}
            required
          />
          <input type='submit' className='btn btn-success mt-2 btn-block' />
        </form>
      </div>
    );

    // rendering the authentication error for assigment deleting
    const showError = (
      <div
        className='alert alert-danger alert-dismissible fade show mt-5'
        role='alert'
      >
        <strong>Not Allowed</strong> {this.props.errors?.notAllowed}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );

    return (
      <>
        <button className='btn btn-primary btn-block' onClick={this.onClick}>
          {this.state.toggle ? "Cancel Upload" : "Upload a new Assignment"}
        </button>
        {this.state.toggle ? showForm : ""}
        {this.props.errors?.subid === this.props.id
          ? this.props.errors?.notAllowed
            ? showError
            : ""
          : ""}
        <AssignContainer
          assignments={dueAssignment}
          message='Due Assignments'
        />
        <AssignContainer
          assignments={gradedAssignment}
          message='Graded Assignments'
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  uploadAssignment,
  deleteAssignment,
  updateAssignmentStatus,
})(TeacherUI);
