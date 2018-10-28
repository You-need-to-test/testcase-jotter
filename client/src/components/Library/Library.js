import React, { Component } from "react";
import Suite from "../Suite/TestSuite";
import { Link, Route } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";
import API from "../../actions/API";

class Library extends Component {

  state = {
    libraries: [],
    lsuites: [],
    suiteLoaded: false
  }

  componentDidMount() {
    this.loadLibrary();
    // console.log({"Library/this.props": this.props})
    // console.log({"Library/this.props": this.props.projectId})
  }

  componentDidUpdate() {
    // console.log({"Library/this.props": this.props})
    // console.log(this.state.libraries)
  }
  
  componentWillReceiveProps(nextProps){
    if(window.location.href.match(/library\/undefined/g)) {
      console.log("Pausing on library loading to add new value");
    } else {
      this.loadLibrary(nextProps);
    }
  }

  async loadLibrary() {
    const result = await API.getLibraries(this.props.projectId);
    if(result.data) {
      const newState = result.data.map(lib => lib)
      this.setState({libraries: newState});
      // console.log({"libraries_state":newState});
    }
  }

  addLibraryOnClick() {
    let newState = this.state.libraries;
    newState.push({'library_name':''});
    this.setState({ libraries: newState });
  }

  onInputChange = i => e => {
    let libraries = [...this.state.libraries];
    libraries[i].library_name = e.target.value;
    this.setState({ libraries });
  };

  postOnEnter = i => async e => {
    if (e.charCode === 13 && this.state.libraries[i]) {
      if (!this.state.libraries[i]._id) {
        await API.postLibrary({
          'library_name': this.state.libraries[i].library_name,
          'project_id': this.props.projectId
        })
      } else {
        await API.updateLibrary(
          {'library_name': this.state.libraries[i].library_name}, 
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
        <h1>Project {this.props.projectId} / Library {this.props.match.params.lId} </h1>
        {/* LIBRARIES */}
        <p>
          <a onClick={() => this.addLibraryOnClick()} 
            className="btn-floating btn-small waves-effect waves-light grey">
            <i className="tiny material-icons">add</i>
          </a> Library
        </p>
        <div className="library-section col s2">
          {this.state.libraries.map((lib, index) => (
            <li key={index}>
              <Link to={`/project/${this.props.projectId}/library/${lib._id}`}>
                <input
                  type="text"
                  placeholder="New Library"
                  onChange={this.onInputChange(index)}
                  onKeyPress={this.postOnEnter(index)}
                  onKeyDown={this.deleteOnBackspace(index)}
                  value={lib.library_name}
                />
              </Link>
            </li>
          ))}
        </div>
        {/* SUITES */}
        <div className="library-section col offset-s1 s9">
          <Suite/>
        </div>
        {/* <div className="col 10">
          <Route
            // path={`${this.props.match.url}/library/${this.state.selectedLibrary}`}
            path={`${this.props.match.url}/library/1`}
            // render={props => <Suite {...props}/>}
            render={props => <div>TEST1</div>}
          />
        </div> */}
        {/* <Suite/> */}
      </div>
    )
  }
}

export default Library;