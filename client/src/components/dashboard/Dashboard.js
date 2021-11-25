import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubjects } from "../../actions/dashActions";
import { getNotifications } from "../../actions/authActions";
import { Link } from "react-router-dom";
import "./dash.css";
import subCover from "../../img/subCover.jpg";
class Dashboard extends Component {
  //loads the subject when component mounts
  componentDidMount() {
    this.props.getSubjects();
    this.props.getNotifications(this.props.auth.user.id);
  }
  render() {
    const { user } = this.props.auth;
    const { subjects } = this.props.dash;
    let displaySubjects = "";

    // getting the subject from subjects array
    if (Object.keys(subjects).length > 0) {
      displaySubjects = subjects.map((sub) => {
        return (
          <div className='card col-md-4 p-0' key={sub._id}>
            <Link className='card-link' to={`/dashboard/subject/${sub._id}`}>
              <img className='card-img-top' src={subCover} alt='Card cap' />
              <div className='card-body'>
                <h5 className='card-title'>{sub.name}</h5>
              </div>
            </Link>
          </div>
        );
      });
    } else {
      displaySubjects = <h1>Loading</h1>;
    }
    return (
      <div className='container'>
        <div className='user-name mt-5 text-white'>
          Your Dashboard ({user.name})
        </div>
        <div className='card-deck row'>{displaySubjects}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  dash: state.dash,
});

export default connect(mapStateToProps, { getSubjects, getNotifications })(
  Dashboard
);
