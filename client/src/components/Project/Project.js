import React, { Component } from "react";
import { connect } from 'react-redux';

import Library from "../Library/Library";

class Project extends Component {
  render() {
    // console.log(this.props)
    return (
      <div>
        <a href="http://localhost:5000/api/logout"><button type="button" className="btn btn-dark">Logout</button></a>
        <a href="http://localhost:5000/api/current_user"><button type="button" className="btn btn-primary">Current User</button></a>
        <h4>Project</h4>
        <Library />
      </div>
    );
  }
}

function mapStateToProps(auth) {
  return { auth }
}

export default connect(mapStateToProps)(Project);