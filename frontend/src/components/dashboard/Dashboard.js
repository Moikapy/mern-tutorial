import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//actions
import { getCurrentProfile } from "../../actions/profileActions";
// Components
import { Spinner } from "../common";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h1>TODO: Display Profile</h1>;
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
              {/* TOOL BAR */}
              {/*
              <p className="lead text-muted">Welcome John Doe</p>
              <div className="btn-group mb-4" role="group">
                <a href="edit-profile.html" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" /> Edit
                  Profile
                </a>
                <a href="add-experience.html" className="btn btn-light">
                  <i className="fab fa-black-tie text-info mr-1" />
                  Add Experience
                </a>
                <a href="add-education.html" className="btn btn-light">
                  <i className="fas fa-graduation-cap text-info mr-1" />
                  Add Education
                </a>
              </div>
              */}
              {
                /* Experience */
              /*<div>
                <h4 className="mb-2">Experience Credentials</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Years</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tech Guy Web Solutions</td>
                      <td>Senior Developer</td>
                      <td>02-03-2009 - 01-02-2014</td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Traversy Media</td>
                      <td>Instructor & Developer</td>
                      <td>02-03-2015 - Now</td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              */}
              {/* Education */
              /*
              <div>
                <h4 className="mb-2">Education Credentials</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>School</th>
                      <th>Degree</th>
                      <th>Years</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Northern Essex</td>
                      <td>Associates</td>
                      <td>02-03-2007 - 01-02-2009</td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              */}
              {/*DELETE BUTTON*/}
              {/*
              <div style={{ marginBottom: "60px;" }}>
                <button className="btn btn-danger">Delete My Account</button>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
