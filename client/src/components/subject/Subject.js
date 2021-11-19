import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSubject, uploadAssignment } from "../../actions/dashActions";
import StudentUI from "./StudentUI";
import "./sub.css";
import TeacherUI from "./TeacherUI";
class Subject extends Component {
  //get the subject everytime the component loads
  componentDidMount() {
    this.props.getSubject(this.props.match.params.id);
  }
  render() {
    const { role } = this.props.auth.user;
    const { subject } = this.props.subject;
    return (
      <div className='container'>
        <div className='btn btn-primary mt-3'>
          <Link to='/dashboard' className='text-white'>
            Back
          </Link>
        </div>
        <h1 className='user-name mt-5 mb-4 text-white display-5'>
          {subject.name}
        </h1>
        {role === "Student" ? (
          <StudentUI
            assigns={subject.assignments}
            id={this.props.match.params.id}
          />
        ) : (
          <TeacherUI
            assigns={subject.assignments}
            id={this.props.match.params.id}
          />
        )}
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
