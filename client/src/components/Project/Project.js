import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import Library from "./Library";
import API from "../../actions/API";

import test_quire from "../../img/test_quire.png";

class Project extends Component {
  state = {
    projects: [],
    selectedProject: "",
    plibraries: [],
    libraryLoaded: false
  };

  componentDidMount = () => {
    this.loadProject();
    if (window.location.href.match(/library/g)) {
      this.setState({ libraryLoaded: true });
    } else {
      this.loadDefaultLibrary();
    }
  };

  componentWillReceiveProps = nextProps => {
    if (window.location.href.match(/library/g)) {
      this.setState({ libraryLoaded: true });
    } else {
      this.setState({ libraryLoaded: false });
      this.loadDefaultLibrary(nextProps);
    }
    // console.log({
    //   "Library?": window.location.href.match(/library/g),
    //   LibraryOnURL: this.state.libraryLoaded
    // });
  };

  async loadProject() {
    console.log(this.props.auth)
    const result = await API.getProjects();
    const newState = result.data.map(prj => prj);
    this.setState({ projects: newState });
    // console.log({"projects_state":newState});
  }

  async loadDefaultLibrary() {
    if (
      window.location.pathname !== "/project/" &&
      window.location.pathname !== "/"
    ) {
      const result = await API.getLibraries(this.props.projectId);

      if (result.data) {
        const newState = result.data.map(lib => lib);
        this.setState({ plibraries: newState });
      }
    }
  }

  addProjectOnClick() {
    let newState = this.state.projects;
    newState.push({ project_name: "" });
    this.setState({ projects: newState });
  }

  onInputChange = i => e => {
    let projects = [...this.state.projects];
    projects[i].project_name = e.target.value;
    this.setState({ projects });
  };

  onProjectClick = i => {
    if (this.state.projects) {
      this.setState({ selectedProject: this.state.projects[i] });
    }
  };

  saveOnEnter = i => async e => {
    if ( !window.location.href.match(/undefined/g) ) {
      if (e.charCode === 13 && this.state.projects[i]) {
        if (!this.state.projects[i]._id) {
          /** POST RESULT */
          await API.postProject({
            project_name: this.state.projects[i].project_name
          });
        } else {
          /** UPDATE RESULT */
          await API.updateProject(
            { project_name: this.state.projects[i].project_name },
            this.state.projects[i]._id
          );
        }
        this.loadProject();
      }
    }
  };

  saveOnBlur = i => async () => {
    if (this.state.projects[i]) {
      if (!this.state.projects[i]._id) {
        /** POST RESULT */
        await API.postProject({
          project_name: this.state.projects[i].project_name
        });
      } else {
        /** UPDATE RESULT */
        await API.updateProject(
          { project_name: this.state.projects[i].project_name },
          this.state.projects[i]._id
        );
      }
      this.loadProject();
    }
  };

  deleteOnBackspace = i => async e => {
    if (e.keyCode === 8 && !this.state.projects[i].project_name) {
      /** CONFIRM AND DELETE RESULT */
      if (window.confirm("Delete the Project??")) {
        await API.deleteProject(this.state.projects[i]._id);
      }
      this.loadProject();
    }
  };

  showCurrentUser() {
    if (!this.props.auth) {
      return null;
    }
    return (
      <Fragment>
        <li className="center">
          Welcome {this.props.auth.givenName.toUpperCase()}
        </li>
        <li className="center">
          <a href="/api/logout">
            <i className="large material-icons">power_settings_new</i>
          </a>
        </li>
      </Fragment>
    );
  }

  renderNav() {
    return (
      <Fragment>
        {/* LOGO && LOGIN */}
        <div className="nav-wrapper grey darken-4">
          <div href="#" className="brand-logo center">
            <img src={test_quire} alt={""} style={{ height: "66px", width: "370px" }} />
          </div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.showCurrentUser()}
          </ul>
        </div>
      </Fragment>
    );
  }
  // <a
  // onClick={() => this.addProjectOnClick()}
  // className="btn-floating btn-large waves-effect waves-light grey"
  // >
  // <i className="material-icons">add</i>
  // </a>
  render() {
    return (
      <Fragment>
        <div>
          <nav className="nav-extended" style={{ background: "black" }}>
            {this.renderNav()}
            {/* PROJECT */}
            <ul
              className=""
              style={{
                background: "grey darken-4",
                height: "70px",
                border: "2px solid grey",
                borderRadius: "5px"
              }}
            >
              <li
                style={{
                  fontFamily: "Delius Swash Caps, cursive",
                  fontSize: "25px",
                  color: "#9e249e",
                  marginLeft: "30px"
                }}
              >
                Projects
              </li>
              <li>
                <a
                  onClick={() => this.addProjectOnClick()}
                  className="btn-small waves-effect waves-light grey"
                >
                  {" "}
                  <i className="material-icons">add</i>
                </a>
              </li>
              {this.state.projects.map((proj, index) => {
                if (proj._id === window.location.pathname.split("/")[2]) {
                  return (
                    <li className="tab" key={index}>
                      <Link to={`/project/${proj._id}`}>
                        <input
                          style={{
                            color: "white",
                            background: "#282C33",
                            textAlign: "center",
                            borderRadius: "5px"
                          }}
                          type="text"
                          placeholder="New Project"
                          onChange={this.onInputChange(index)}
                          onBlur={this.saveOnBlur(index)}
                          onKeyDown={this.deleteOnBackspace(index)}
                          onClick={() => this.onProjectClick(index)}
                          value={proj.project_name}
                        />
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li className="tab" key={index}>
                      <Link to={`/project/${proj._id}`}>
                        {/* this.props.projectId DOES NOT CHANGE */}
                        {/* <Link to={`/project/${this.props.projectId}`}> */}
                        {/*This is the button*/}
                        <input
                          style={{
                            color: "#00D8FF",
                            textAlign: "center",
                            fontWeight: "bold",
                            border: "2px solid grey",
                            borderRadius: "5px"
                          }}
                          type="text"
                          placeholder="New Project"
                          onChange={this.onInputChange(index)}
                          onBlur={this.saveOnBlur(index)}
                          onKeyPress={this.saveOnEnter(index)}
                          onKeyDown={this.deleteOnBackspace(index)}
                          onClick={() => this.onProjectClick(index)}
                          value={proj.project_name}
                        />
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </div>

        {(() => {
          if (
            !this.state.libraryLoaded &&
            window.location.pathname.split("/")[2]
          ) {
            // LOAD DEFAULT
            return <Library {...this.props} />;
          } else {
            return (
              <Route
                path={`${this.props.match.url}/library/:lId`}
                render={props => (
                  <Library
                    {...this.props}
                    {...props}
                    libraryId={props.match.params.lId}
                  />
                )}
              />
            );
          }
        })()}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Project);
