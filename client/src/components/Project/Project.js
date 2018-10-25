import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import Library from "../Library/Library";
import API from "../../actions/API";

class Project extends Component {
  state = {
    projects: ["Project 1", "Project 2"],
    selectedProject: null
  };
  componentDidMount = async () => {
    await this.loadProject();
    // console.log(this.state.projects);
  };

  // componentDidUpdate = () => {
  //   console.log("Project", this.state.selectedProject);
  // };

  showCurrentUser() {
    if (!this.props.auth) {
      return null;
    }
    return (
      <Fragment>
        <li>
          <h5>{this.props.auth.givenName} {this.props.auth.familyName}</h5>
        </li>
        <li>
          <a href="/api/logout">
            <button type="button" className="btn btn-dark grey">
              Logout
            </button>
          </a>
        </li>
      </Fragment>
    );
  }

  addProjectOnClick() {
    let newState = this.state.projects;
    newState.push("");
    this.setState({ projects: newState });
  }

  onInputChange = i => e => {
    let projects = [...this.state.projects];
    projects[i] = e.target.value;
    this.setState({ projects });
  };

  postOnEnter = i => async e => {
    if (e.charCode === 13 && this.state.projects[i]) {
      /** SEARCH RESULT */
      const searchResult = await API.searchProject(i+1);
      if (searchResult.data) {
        /** UPDATE RESULT */
        await API.updateProject({'project_name': this.state.projects[i]}, i+1);
      } else {
        /** POST RESULT */
        await API.postProject({
          'project_name': this.state.projects[i],
          'project_index': i+1
        })
      }
      this.loadProject();
    }
  };
  deleteOnBackspace = i => async e => {
    if (e.keyCode === 8 && !this.state.projects[i]) {
      /** CONFIRM DELETE RESULT */
      if (window.confirm("Press a button!")) {
        await API.deleteProject(i+1);
      }
      this.loadProject();
    }
  }

  async loadProject() {
    const result = await API.getProjects();
    // console.log(result.data)
    const newState = result.data.map(name => {
      return name.project_name
    })
    this.setState({projects: newState});
  }

  renderNav() {
    return (
      <Fragment>
        {/* LOGO && LOGIN */}
        <div className="nav-wrapper">
          <div href="#" className="brand-logo">
            <a onClick={() => this.addProjectOnClick()} className="btn-floating btn-large waves-effect waves-light grey">
              <i className="material-icons">add</i>
            </a> TESTCASE JOTTER
          </div>
          
          {/* <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a> */}
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li >

            </li>
            {this.showCurrentUser()}
          </ul>
        </div>
      </Fragment>
    );
  }
  render() {
    return (
      <Fragment>
        <div>
          <nav className="nav-extended" style={{ background: "grey" }}>
            {this.renderNav()}
            {/* PROJECTS */}
            <div className="nav-content">
              {this.state.projects.map((proj, index) => (
                <li className="tab" key={index}>
                  <Link to={`/project/${index + 1}`}>
                    <input
                      type="text"
                      placeholder="New Project"
                      onChange={this.onInputChange(index)}
                      onKeyPress={this.postOnEnter(index)}
                      onKeyDown={this.deleteOnBackspace(index)}
                      onClick={() =>
                        this.setState({ selectedProject: index + 1 })
                      }
                      value={proj}
                    />
                  </Link>
                </li>
              ))}
              {/* <ul className="tabs tabs-transparent">
                <li>Link to doesn't work in this ul</li>
              </ul> */}
            </div>
          </nav>
        </div>
        <Route
          path={`${this.props.match.url}/1`}
          render={props => <p>Project 1: Chat Blah Blah Blah</p>}
        />
        <Route
          path={`${this.props.match.url}/2`}
          render={props => <Library {...props}/>}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Project);
