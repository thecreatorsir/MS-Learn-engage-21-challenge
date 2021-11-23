import React, { Component } from "react";
import { connect } from "react-redux";
import { getResponses } from "../../actions/dashActions";
import { Link } from "react-router-dom";
import tick from "../../img/tick.jpg";
class Response extends Component {
  //get all the reponses when component loads
  componentDidMount() {
    this.props.getResponses(
      this.props.match.params.id,
      this.props.match.params.aid
    );
  }
  render() {
    let response = "";

    // if responses exists then get them using array of links to show it on UI
    if (this.props.subject.responses) {
      response = this.props.subject.responses.map((res) => (
        <Link
          to={`/dashboard/subject/${this.props.match.params.id}/assignment/${this.props.match.params.aid}/responses/${res._id}`}
          className='list-group-item list-group-item-action'
          key={res._id}
          title='click to see the response'
        >
          {res.student_name}{" "}
          {res.graded ? (
            <span style={{ float: "right" }} title='graded check'>
              <img src={tick} alt='graded' />
            </span>
          ) : (
            ""
          )}
        </Link>
      ));
    }
    return (
      <div className='container mt-5'>
        <div className='btn btn-primary mt-3 mb-3'>
          <Link
            to={`/dashboard/subject/${this.props.match.params.id}/`}
            className='text-white'
          >
            Back
          </Link>
        </div>
        <div className='jumbotron'>
          <div className='h1 text-center text-dark'>Responses</div>
          <div className='list-group assignment-list mt-2'>{response}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subject: state.subject,
});

export default connect(mapStateToProps, { getResponses })(Response);
