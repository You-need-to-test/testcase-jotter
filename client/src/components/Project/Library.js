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
  }

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
    if ( window.location.href.match(/library/g) ) {
      const result = await API.getSuites(this.props.libraryId);
      if (result.data) {
        const newState = result.data.map(suite => suite)
        this.setState({lsuites: newState});
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
      console.log(this.state.libraries[i]);
    }
  };

  postOnEnter = i => async e => {
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
    return (
      <div className="row">
        {/* LIBRARIES */}
        <div className="library col s1">
        {( ()=> {
          if (this.state.selectedLibrary.library_name) {
            return <h5>{this.state.selectedLibrary.library_name}</h5>
          } else {
            return <h5>Library</h5>
          }
        })()}<br/><br/>
          <p>Library{" "} <a
              onClick={() => this.addLibraryOnClick()}
              className="btn-floating btn-small waves-effect waves-light grey"
            >
              <i className="tiny material-icons">add</i>
            </a>
            
          </p>
          <div className="library-section">
            {this.state.libraries.map((lib, index) => (
              <li key={index}>
                <Link to={`/project/${this.props.projectId}/library/${lib._id}`}>
                  <input
                    type="text"
                    placeholder="New Library"
                    onChange={this.onInputChange(index)}
                    onKeyPress={this.postOnEnter(index)}
                    onKeyDown={this.deleteOnBackspace(index)}
                    onClick={() => this.onLibraryClick(index)}
                    value={lib.library_name}
                  />
                </Link>
              </li>
            ))}
          </div>
        </div>
        {/* SUITES */}
        <div className="library-section col s11">
          {(() => {
            if (!this.state.suiteLoaded) {
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
}

export default Library;
