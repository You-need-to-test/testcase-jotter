import React, { Component } from "react";
import { connect } from 'react-redux';
import Library from "../Library/Library";

class Project extends Component {
  showCurrentUser() {
    if (!this.props.auth) {
      return null;
    } 
    return (
      <div>
        <h5>Welcome {this.props.auth.givenName} {this.props.auth.familyName}</h5>
        <a href="/api/logout"><button type="button" className="btn btn-dark">Logout</button></a>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.showCurrentUser()}

        <h5>Project</h5>
        <Library />
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {auth};
}

export default connect(mapStateToProps)(Project);
