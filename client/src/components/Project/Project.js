import React, { Component } from "react";
import { connect } from 'react-redux';
import Library from "../Library/Library";
import Select from 'react-select'
import {Navbar, NavItem, Row, Col} from 'react-materialize'


const options = [
  { value: 'Project 1', label: 'Project 1' },
  { value: 'Project 2', label: 'Project 2' },
  { value: 'Project 3', label: 'Project 3' }
]
class Project extends Component {

  showCurrentUser() {
    if (!this.props.auth) {
      return null;
    } 
    return (
      <div>
        <Row>
          <Col s={6}>
            <h5>{this.props.auth.givenName} {this.props.auth.familyName}</h5>
          </Col>
          <Col s={6}>
            <a href="/api/logout"><button type="button" className="btn btn-dark">Logout</button></a>
          </Col>
        </Row>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Navbar brand='TestCase Jotter' className=" cyan accent-4" right>
          <NavItem >{this.showCurrentUser()}</NavItem>
        </Navbar>

        <div>
          <Row>
            <Col s={1}>
              <h4>Projects </h4>
            </Col>
            <Col s={3}>
              <Select options={options} />
            </Col>
          </Row>
        </div>
        <Library />
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {auth};
}

export default connect(mapStateToProps)(Project);
