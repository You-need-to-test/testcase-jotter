import React, { Component, Fragment } from "react";
// import Suite from "../Suite/Suite";
import { Link, Route } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";

class Suite extends Component {
  state = {
    suites: ["Library 1", "Library 2"],
    selectedSuite: null
  }
//   componentDidUpdate() {
  //   console.log(this.props.match.url);
    // console.log(this.state.selectedSuite);
//   }

  addLibraryOnClick() {
    let newState = this.state.suites;
    newState.push("");
    this.setState({ suites: newState });
  }

  onInputChange = i => e => {
    let suites = [...this.state.suites];
    suites[i] = e.target.value;
    this.setState({ suites });
  };

  render() {
    return (
      <Fragment>
        {/* SUITES */}
        <p>
          <a onClick={() => this.addLibraryOnClick()} 
            className="btn-floating btn-small waves-effect waves-light grey">
            <i className="tiny material-icons">add</i>
          </a> Suite
        </p>
        {/* <div className="suite-section">
          {this.state.suites.map((suite, index) => (
            <li key={index}>
              <Link to={`${this.props.match.url}/suite/${index + 1}`}>
                <input
                  type="text"
                  placeholder="New Suite"
                  onChange={this.onInputChange(index)}
                  // onKeyPress={this.postOnEnter(index)}
                  // onKeyDown={this.deleteOnBackspace(index)}
                  onClick={() =>
                    this.setState({ selectedSuite: index + 1 })
                  }
                  value={suite}
                />
              </Link>
            </li>
          ))}
        </div> */}
        {/* SUITES */}
        {/* <div className="col 10">
          <Route
            // Q2 
            // path={`${this.props.match.url}/${this.state.selectedProject}/`}
            path={`${this.props.match.url}/1/`}
            render={props => <Suite {...props}/>}
            // render={props => <div>TEST</div>}
          />
        </div> */}
      </Fragment>
    )
  }
}

export default Suite;