import React, { Component } from "react";
import Suite from "./Suite";
import { Link, Route } from "react-router-dom";

// import "react-web-tabs/dist/react-web-tabs.css";
import API from "../../actions/API";

class Library extends Component {
  state = {
    libraries: [],
    selectedLibrary: "",
    lsuites: [],
    suiteLoaded: false
  };

  componentDidMount() {
    this.loadLibrary();
    if (window.location.href.match(/suite/g)) {
      this.setState({ suiteLoaded: true });
    } else {
      this.loadDefaultSuite();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (window.location.href.match(/suite/g)) {
      this.setState({ suiteLoaded: true });
    } else {
      this.setState({ suiteLoaded: false });
      this.loadDefaultSuite(nextProps);
    }
    // console.log({
    //   "Suite?": window.location.href.match(/suite/g),
    //   SuiteOnURL: this.state.suiteLoaded
    // });

    if (window.location.href.match(/library\/undefined/g)) {
      console.log("Pausing on library loading to add new value");
    } else {
      this.loadLibrary(nextProps);
    }
  };

  async loadLibrary() {
    if (
      window.location.pathname !== "/project/" &&
      window.location.pathname !== "/"
    ) {
      const result = await API.getLibraries(this.props.projectId);
      if (result.data) {
        const newState = result.data.map(lib => lib);
        this.setState({ libraries: newState });
      }
    }
  }

  async loadDefaultSuite() {
    if (window.location.href.match(/library/g)) {
      const result = await API.getSuites(this.props.libraryId);
      if (result.data) {
        const newState = result.data.map(suite => suite);
        this.setState({ lsuites: newState });
      }
    }
  }

  addLibraryOnClick() {
    let newState = this.state.libraries;
    newState.push({ library_name: "" });
    this.setState({ libraries: newState });
  }

  onInputChange = i => e => {
    let libraries = [...this.state.libraries];
    libraries[i].library_name = e.target.value;
    this.setState({ libraries });
  };

  onLibraryClick = i => {
    if (this.state.libraries) {
      this.setState({ selectedLibrary: this.state.libraries[i] });
      // console.log(this.state.libraries[i]);
    }
  };

  saveOnEnter = i => async e => {
    if ( !window.location.href.match(/undefined/g) ) {
      if (e.charCode === 13 && this.state.libraries[i]) {
        if (!this.state.libraries[i]._id) {
          await API.postLibrary({
            library_name: this.state.libraries[i].library_name,
            project_id: this.props.projectId
          });
        } else {
          await API.updateLibrary(
            { library_name: this.state.libraries[i].library_name },
            this.state.libraries[i]._id
          );
        }
        this.loadLibrary();
      }
    }
  };

  saveOnBlur = i => async () => {
    if (this.state.libraries[i]) {
      if (!this.state.libraries[i]._id) {
        await API.postLibrary({
          library_name: this.state.libraries[i].library_name,
          project_id: this.props.projectId
        });
      } else {
        await API.updateLibrary(
          { library_name: this.state.libraries[i].library_name },
          this.state.libraries[i]._id
        );
      }
      this.loadLibrary();
    }
  };

  deleteOnBackspace = i => async e => {
    if (e.keyCode === 8 && !this.state.libraries[i].library_name) {
      /** CONFIRM DELETE RESULT */
      if (window.confirm("Delete the Library??")) {
        await API.deleteLibrary(this.state.libraries[i]._id);
      }
      this.loadLibrary();
    }
  };

  render() {
    // if ( !window.location.href.match(/project\/undefined/g) ) {

    return (
      <div className="row">
        {/* LIBRARIES */}
        <div
          className="library col s1.5 "
          style={{
            background: "black",
            border: "2px solid grey",
            borderRadius: "5px",
            height: "90vh",
            margin: "10px 0"
          }}
        >
          <p
            style={{
              fontFamily: "Delius Swash Caps, cursive",
              fontSize: "25px",
              color: "#9e249e",
              marginLeft: "20px"
            }}
          >
            Library
            <a
              onClick={() => this.addLibraryOnClick()}
              className="btn-small waves-effect waves-light grey"
              style={{ margin: "0 15px" }}
            >
              <i className="tiny material-icons">add</i>
            </a>
          </p>
          <div className="library-section">
            {this.state.libraries.map((lib, index) => {
              if (lib._id === window.location.pathname.split("/")[4]) {
                return (
                  <li key={index}>
                    <Link
                      to={`/project/${this.props.projectId}/library/${lib._id}`}
                    >
                      <input
                        style={{
                          color: "#00D8FF",
                          textAlign: "center",
                          fontWeight: "bold",
                          border: "2px solid grey",
                          borderRadius: "5px"
                        }}
                        type="text"
                        placeholder="New Library"
                        onChange={this.onInputChange(index)}
                        onBlur={this.saveOnBlur(index)}
                        onKeyDown={this.deleteOnBackspace(index)}
                        onClick={() => this.onLibraryClick(index)}
                        value={lib.library_name}
                      />
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    <Link
                      to={`/project/${this.props.projectId}/library/${lib._id}`}
                    >
                      <input
                        style={{
                          color: "white",
                          background: "#282C33",
                          textAlign: "center",
                          borderRadius: "5px"
                        }}
                        type="text"
                        placeholder="New Library"
                        onChange={this.onInputChange(index)}
                        onBlur={this.saveOnBlur(index)}
                        onKeyPress={this.saveOnEnter(index)}
                        onKeyDown={this.deleteOnBackspace(index)}
                        onClick={() => this.onLibraryClick(index)}
                        value={lib.library_name}
                      />
                    </Link>
                  </li>
                );
              }
            })}
          </div>
        </div>
        {/* SUITES */}
        <div className="suite-section col s10.5">
          {(() => {
            if (
              !this.state.suiteLoaded &&
              window.location.pathname.split("/")[4]
            ) {
              // LOAD DEFAULT
              return <Suite {...this.props} />;
            } else {
              return (
                <div>
                  <Route
                    path={`${this.props.match.url}/suite/:sId`}
                    render={props => (
                      <Suite
                        {...this.props}
                        {...props}
                        suiteId={props.match.params.sId}
                      />
                    )}
                  />
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
  // }
}

export default Library;
