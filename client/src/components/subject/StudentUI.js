import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AssignContainer from "./AssignContainer";
import { getNotifications } from "../../actions/authActions";
import "./sub.css";
class StudentUI extends Component {
  constructor() {
    super();
    this.getAssignment = this.getAssignment.bind(this);
  }
  componentDidMount() {
    this.props.getNotifications(this.props.auth.user.id);
  }
  // function to get student assigmnent based in diffrent checks
  getAssignment(assignments, chk, condition) {
    // if assignment exists
    if (assignments && Object.keys(assignments).length > 0) {
      return assignments.map((assign) => {
        let url = `/dashboard/subject/${this.props.id}/assignment/${assign._id}`;

        // getting the user response for the assigmnent
        const idx = assign.responses
          .map((res) => res._id)
          .indexOf(this.props.auth.user.id);
        let isgraded = false;
        let due = assign.due;
        let grade = 0;

        //if response exists setting the values
        if (idx !== -1) {
          isgraded = assign.responses[idx].graded;
          grade = assign.responses[idx].grade;
        }

        //for due assignment
        if (idx === -1 && due && chk === "due") {
          console.log(due);
          return (
            <Link
              to={url}
              className='list-group-item list-group-item-action'
              key={assign._id}
            >
              {assign.name}
            </Link>
          );
        }
        //for missed assignments
        else if (idx === -1 && !due && chk === "missed") {
          return (
            <div
              className='list-group-item list-group-item-action'
              key={assign._id}
              title='Not editable'
            >
              {assign.name}
              <span style={{ float: "right" }}>Your Grade:{grade}</span>
            </div>
          );
        }
        //grading or graded assignments based in condition that have been passed
        else if (idx !== -1 && isgraded === condition) {
          return chk === "graded" ? (
            // if graded the links are not active
            <div
              className='list-group-item list-group-item-action'
              key={assign._id}
              title='Not editable'
            >
              {assign.name}
              <span style={{ float: "right" }}>Your Grade:{grade}</span>
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

    const dueAssignment = this.getAssignment(assigns, "due");
    const missedAssignment = this.getAssignment(assigns, "missed");
    const gradingAssignment = this.getAssignment(assigns, "grading", false);
    const gradedAssignment = this.getAssignment(assigns, "graded", true);
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
        <AssignContainer
          assignments={missedAssignment}
          message='Missed Assignments'
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getNotifications })(StudentUI);
