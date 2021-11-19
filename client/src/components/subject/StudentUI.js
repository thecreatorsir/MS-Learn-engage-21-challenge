import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AssignContainer from "./AssignContainer";
import "./sub.css";
class StudentUI extends Component {
  constructor() {
    super();
    this.getAssignment = this.getAssignment.bind(this);
  }
  getAssignment(assignments, chk, condition) {
    if (assignments && Object.keys(assignments).length > 0) {
      return assignments.map((assign) => {
        let url = `/dashboard/subject/${this.props.id}/assignment/${assign._id}`;

        const idx = assign.responses
          .map((res) => res._id)
          .indexOf(this.props.auth.user.id);
        let isgraded = false;

        //response exists
        if (idx !== -1) isgraded = assign.responses[idx].graded;

        //due assignment
        if (idx === -1 && chk === "due") {
          return (
            <Link
              to={url}
              className='list-group-item list-group-item-action'
              key={assign._id}
            >
              {assign.name}
            </Link>
          );
        } else if (idx !== -1 && isgraded === condition) {
          return chk === "graded" ? (
            <div
              className='list-group-item list-group-item-action'
              key={assign._id}
              title='Not editable'
            >
              {assign.name}
            </div>
          ) : (
            <Link
              to={url}
              className='list-group-item list-group-item-action'
              key={assign._id}
            >
              {assign.name}
            </Link>
          );
        }
        return "";
      });
    }
    return "";
  }
  render() {
    const { assigns } = this.props;

    let dueAssignment = this.getAssignment(assigns, "due");
    let gradingAssignment = this.getAssignment(assigns, "grading", false);
    let gradedAssignment = this.getAssignment(assigns, "graded", true);
    return (
      <>
        <AssignContainer
          assignments={dueAssignment}
          message='Due Assignments'
        />
        <AssignContainer
          assignments={gradingAssignment}
          message='Grading in progress'
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
});

export default connect(mapStateToProps, {})(StudentUI);
