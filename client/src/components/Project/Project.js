import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

// import Library from "../Library/Library";
// import Select from 'react-select'
import { Navbar, NavItem, Row, Col } from "react-materialize";

// const options = [
//   { value: 'Project 1', label: 'Project 1' },
//   { value: 'Project 2', label: 'Project 2' },
//   { value: 'Project 3', label: 'Project 3' }
// ]

class Project extends Component {
  state = {
    projects: ["Project 1", "Project 2"],
    selectedProject: null
  };
  // componentDidMount = () => {
  //   console.log(this.props);
  // };

  componentDidUpdate = () => {
    // console.log("project",this.state.selectedProject);
    console.log(this.state.projects);
  };

  showCurrentUser() {
    if (!this.props.auth) {
      return null;
    }
    return (
      <div>
        <Row>
          <Col s={6}>
            <h5>
              {this.props.auth.givenName} {this.props.auth.familyName}
            </h5>
          </Col>
          <Col s={6}>
            {/* <a href="/api/logout"><button type="button" className="btn btn-dark">Logout</button></a> */}
          </Col>
        </Row>
      </div>
    );
  }

  addProject() {
    console.log(this.state.projects.length);
    let newState = this.state.projects;
    newState.push("");
    this.setState({ projects: newState });
  }

  onInputChange = i => e => {
    let projects = [...this.state.projects];
    projects[i] = e.target.value;
    this.setState({ projects });
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            TestCase-Jotter
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li onClick={() => this.addProject()}>
              <a>+</a>
            </li>

            <Link
              to={`/project/${this.state.projectNumber[0]}`}
              onClick={() => this.setState({ selectedProject: this.state.projectNumber[0] })}
            >Project1
            </Link>

            {this.state.projects.map((proj, index) => (
              <li key={index}>
                <a href="#">
                  <input
                    type="text"
                    placeholder="New Project"
                    onChange={this.onInputChange(index)}
                    value={proj}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      // <div>

      //     <Link to={`/project/${this.state.projectNumber[1]}`}
      //       onClick={ ()=>this.setState({selectedProject: this.state.projectNumber[1]}) }
      //     >Project2</Link>
      //     <Link to={`/project/${this.state.projectNumber[2]}`}
      //       onClick={ ()=>this.setState({selectedProject: this.state.projectNumber[2]}) }
      //     >Project3</Link>
      //   </div>
      //   <Route
      //     path={`${this.props.match.url}/1`}
      //     render={props => <Library {...props}/>}
      //   />
      //   <Route
      //     path={`${this.props.match.url}/2`}
      //     render={props => <Library {...props}/>}
      //   />
      //   <Route
      //     path={`${this.props.match.url}/3`}
      //     render={props => <div>TEST</div>}
      //   />

      //   <Navbar brand="TestCase Jotter" className=" cyan accent-4" right>
      //     <NavItem>{this.showCurrentUser()}</NavItem>
      //   </Navbar>

      //   <div>
      //     <Row>
      //       <Col s={1}>
      //         <h4>Projects </h4>
      //       </Col>
      //       <Col s={3}>
      //         <Select options={options} />
      //       </Col>
      //     </Row>
      //   </div>
      //   <Library />
      // </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Project);
