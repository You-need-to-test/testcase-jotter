import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";
import API from "../../actions/API";
import TestCaseApi from "../../api/TestCaseApi";

import TestCase from "../Suite/TestCase";

class Suite extends Component {
  state = {
    suites: [],
    selectedSuite: "",
    testCases: [],
    caseLoaded: false
  };

  componentDidMount() {
    this.loadSuite();
  }

  componentWillReceiveProps(nextProps) {
    if (window.location.href.match(/suite\/undefined/g)) {
      console.log("Pausing on suite loading to add new value");
    } else {
      this.loadSuite(nextProps);
    }
  }

  async loadSuite() {
    if (window.location.href.match(/library/g)) {
      const result = await API.getSuites(this.props.libraryId);
      if (result.data) {
        const newState = result.data.map(suite => suite);
        this.setState({ suites: newState });
        //   console.log({"suite_state":newState});
      }
    }
  }

  addSuiteOnClick() {
    let newState = this.state.suites;
    newState.push({ suite_name: "" });
    this.setState({ suites: newState });
  }

  onInputChange = i => e => {
    let suites = [...this.state.suites];
    suites[i].suite_name = e.target.value;
    this.setState({ suites });
  };

  onSuiteClick = i => {
    if (this.state.suites) {
      this.setState({ selectedSuite: this.state.suites[i] });
    }
  };

  saveOnEnter = i => async e => {
    if ( !window.location.href.match(/undefined/g) ) {
      if (e.charCode === 13 && this.state.suites[i]) {
        if (!this.state.suites[i]._id) {
          await API.postSuite({
            suite_name: this.state.suites[i].suite_name,
            library_id: this.props.libraryId
          });
        } else {
          await API.updateSuite(
            { suite_name: this.state.suites[i].suite_name },
            this.state.suites[i]._id
          );
        }
      }
    }
  };

  saveOnBlur = i => async e => {
    if (this.state.suites[i]) {
      if (!this.state.suites[i]._id) {
        await API.postSuite({
          suite_name: this.state.suites[i].suite_name,
          library_id: this.props.libraryId
        });
      } else {
        await API.updateSuite(
          { suite_name: this.state.suites[i].suite_name },
          this.state.suites[i]._id
        );
      }
    }
  };

  deleteOnBackspace = i => async e => {
    if (e.keyCode === 8 && !this.state.suites[i].suite_name) {
      /** CONFIRM DELETE RESULT */
      if (window.confirm("Delete the Suite??")) {
        await API.deleteSuite(this.state.suites[i]._id);
      }
      this.loadSuite();
    }
  };

  // TESTCASE METHODS
  showTestCases = async () => {
    const testCases = await TestCaseApi.getTestCases();
    this.setState({
      testCases
    });
    // console.log(this.state.testCases);
  };

  renderTest = data => {
    if (data) {
      this.showTestCases();
    }
  };
  ////

  render() {
    return (
      <Fragment>
        <div className="suite row">
          {/* SUITE */}

          <nav className="nav-extended" style={{ background: "black" }}>
            <ul
              style={{
                background: "grey darken-4",
                height: "70px",
                border: "2px solid grey",
                borderRadius: "5px",
                margin: "10px"
              }}>
              <li
                style={{
                  fontFamily: "Delius Swash Caps, cursive",
                  fontSize: "25px",
                  color: "#9e249e",
                  marginLeft: "20px"
                }}>Suites

                  <a
                    onClick={() => this.addSuiteOnClick()}
                    className="btn-small waves-effect waves-light grey"
                    style={{ margin: "0 15px" }}            >
                    <i className="tiny material-icons">add</i>
                  </a>
              </li>
              {this.state.suites.map((suite, index) => {
                if (suite._id === window.location.pathname.split("/")[6]) {
                  return (
                    <li key={index}>
                      <Link to={`/project/${this.props.projectId}/library/${this.props.libraryId}/suite/${suite._id}`}>
                      <input
                        style={{ color: "white",
                          background: "#282C33",
                          textAlign: "center",
                          borderRadius: "5px"}}
                        type="text"
                        placeholder="New Suite"
                        onChange={this.onInputChange(index)}
                        onBlur={this.saveOnBlur(index)}
                        onKeyDown={this.deleteOnBackspace(index)}
                        onClick={() => this.onSuiteClick(index)}
                        value={suite.suite_name}
                      />
                    </Link>
                  </li>
                  )
                } else {
                  return (
                    <li className="tab" key={index}>
                      <Link
                        to={`/project/${this.props.projectId}/library/${
                          this.props.libraryId
                        }/suite/${suite._id}`}
                      >
                        <input
                          style={{ color: "#00D8FF",
                            textAlign: "center",
                            fontWeight: "bold",
                            border: "2px solid grey",
                            borderRadius: "5px"}}
                          type="text"
                          placeholder="New Suite"
                          onChange={this.onInputChange(index)}
                          onBlur={this.saveOnBlur(index)}
                          // onKeyPress={this.saveOnEnter(index)}
                          onKeyDown={this.deleteOnBackspace(index)}
                          onClick={() => this.onSuiteClick(index)}
                          value={suite.suite_name}
                        />
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </div>
        {/* TESTCASE */}
        <div className="testcase container" style={{background:"lightgrey", width: "95%"}}>
          <div >
            <em>{this.state.selectedSuite.suite_name}</em>
          </div>
          {(() => {
            if (window.location.pathname.split("/")[6]) {
              return (
                <div className="row">
                  <TestCase {...this.props} tc_added={this.renderTest} />
                </div>
              );
            }
          })()}
        </div>
      </Fragment>
    );
  }
}

export default Suite;


// saved testcaseForm and testcase as one component
// view update on submit