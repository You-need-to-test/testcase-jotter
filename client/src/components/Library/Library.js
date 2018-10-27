import React, { Component } from "react";
import Suite from "../Suite/TestSuite";
import { Link, Route } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";
import API from "../../actions/API";

class Library extends Component {

  state = {
    // libraries: ["L1","L2","L3"],
    libraries: [],
    // selectedLibrary: null
  }

  componentDidMount() {
    console.log(this.props)
    this.loadLibrary();
  }
  componentDidUpdate() {
    // console.log("2",this.props)
  }

  addLibraryOnClick() {
    let newState = this.state.libraries;
    newState.push("");
    this.setState({ libraries: newState });
  }

  onInputChange = i => e => {
    let libraries = [...this.state.libraries];
    libraries[i] = e.target.value;
    this.setState({ libraries });
  };

  //take a look
  async loadLibrary() {
    const result = await API.getLibraries(this.projectId);
    const newState = result.data.map(name => {
      return name.library_name
    })
    this.setState({libraries: newState});
  }

  updateOnEnter = i => async e => {
    if (e.charCode === 13 && this.state.libraries[i]) {
      /** SEARCH RESULT */
      const searchResult = await API.searchLibrary(this.props.projectId, `${this.props.projectId}l${i+1}`)
      // console.log(searchResult.data)
      if (searchResult.data) {
        /** UPDATE RESULT */
        // await API.updateProject({'project_name': this.state.projects[i]}, `${this.props.projectId}l${i+1}`);
      } else {
        /** POST RESULT */
        await API.postLibrary({
          'library_name': this.state.libraries[i],
          'library_index': `${this.props.projectId}l${i+1}`
        }, this.props.projectId)
      }
      this.loadLibrary();
    }
  };

  deleteOnBackspace = i => async e => {
    if (e.keyCode === 8 && !this.state.libraries[i]) {
      /** CONFIRM DELETE RESULT */
      if (window.confirm("Delete the Library??")) {
        const test = await API.deleteLibrary(this.props.projectId, `${this.props.projectId}l${i+1}`);
        console.log(test);
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
              {/* <Link to={`/project/${this.props.projectId}/library/l${index+1}`}> */}
              <Link to={`/project/${this.props.projectId}/library/l${index+1}`}>
                <input
                  type="text"
                  placeholder="New Library"
                  onChange={this.onInputChange(index)}
                  onKeyPress={this.updateOnEnter(index)}
                  onKeyDown={this.deleteOnBackspace(index)}
                  // onClick={() =>
                  //   this.setState({ selectedLibrary: `${index+1}` })
                  // }
                  value={lib}
                />
              </Link>
            </li>
          ))}
        </div>
        {/* SUITES */}
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