import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubject, postGrade } from "../../actions/dashActions";
import { withRouter } from "react-router";
import "./assign.css";
export class Grading extends Component {
  constructor() {
    super();
    this.state = {
      grade: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getResponse = this.getResponse.bind(this);
  }

  //load the assignment when component mounts to the dom
  componentDidMount() {
    this.props.getSubject(this.props.match.params.id);
  }

  // on chage event handler for setting the state
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // on submit event handler for grading the assignment
  onSubmit(e) {
    e.preventDefault();
    const newGrade = {
      grade: this.state.grade,
    };
    if (window.confirm("Grade is going to be Awarded!")) {
      this.props.postGrade(
        this.props.match.params.id,
        this.props.match.params.aid,
        this.props.match.params.res_id,
        newGrade,
        this.props.history
      );
    }
  }

  // function that returns a perticular response when a teacher click on that response link
  getResponse(assignments, aid, res_id) {
    const asignIndex = assignments
      ? assignments.map((assign) => assign._id.toString()).indexOf(aid)
      : -1;

    let resIndex = "";
    if (asignIndex !== -1) {
      resIndex = assignments[asignIndex].responses
        .map((response) => response._id.toString())
        .indexOf(res_id);
      return assignments[asignIndex].responses[resIndex];
    }
  }
  render() {
    const res = this.getResponse(
      this.props.subject.subject.assignments,
      this.props.match.params.aid,
      this.props.match.params.res_id
    );
    return (
      <div className='container'>
        <div className='user-name mt-5 mb-4 text-white display-5'>
          {this.props.subject.subject.name}
        </div>
        {res ? (
          <div className='student-info text-center'>
            <h1 className='name'>{res.student_name}</h1>
            <h5 className='roll-no'>{res.roll_num}</h5>
            <h5>Group:{res.group}</h5>
            <a href={res.file}>Click here to Download or view the assignment</a>
            <br />
            <form className='form-group mt-2 mb-2' onSubmit={this.onSubmit}>
              <input
                type='number'
                className='form-control grade-input'
                placeholder='Award Grade'
                name='grade'
                min='0'
                max='10'
                value={this.state.grade}
                onChange={this.onChange}
              />
              <input type='submit' className='btn btn-success ml-2 mt-2' />
            </form>
          </div>
        ) : (
          <div>Please wait while loading....</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  subject: state.subject,
});
export default connect(mapStateToProps, { postGrade, getSubject })(
  withRouter(Grading)
);
