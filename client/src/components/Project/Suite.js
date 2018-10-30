import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";
import API from "../../actions/API";
import TestCaseApi from "../../api/TestCaseApi";

import TestCase from "../Suite/TestCase";
import TestCaseForm from "../Suite/TestCaseForm";

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

  componentDidUpdate() {
    // console.log(window.location.pathname.split("/")[6])
    // console.log(this.state.testCases)
    // console.log(this.props)

  }
  componentWillReceiveProps(nextProps) {
    if (window.location.href.match(/suite\/undefined/g)) {
      console.log("Pausing on suite loading to add new value");
    } else {
      this.loadSuite(nextProps);
    }
  }

  async loadSuite() {
    if ( window.location.href.match(/library/g) ) {
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

  postOnEnter = i => async e => {
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
    console.log(this.state.testCases);
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
          <p style={{ color: "white" }}>Suite {" "}

            <a
              onClick={() => this.addSuiteOnClick()}
              className="btn-floating btn-small waves-effect waves-light grey"
            >
              <i className="tiny material-icons">add</i>
            </a> <em>{this.state.selectedSuite.suite_name}</em>
          </p>
          <nav className="nav-extended" style={{ background: "white" }}>
            <ul >
              {this.state.suites.map((suite, index) => {
                if (suite._id === window.location.pathname.split("/")[6]) {
                  return (
                    <li key={index}>
                      <Link to={`/project/${this.props.projectId}/library/${this.props.libraryId}/suite/${suite._id}`}>
                      <input
                        style={{ color: "black", background: "grey", "fontWeight":"bold"}}
                        type="text"
                        placeholder="New Suite"
                        onChange={this.onInputChange(index)}
                        onKeyPress={this.postOnEnter(index)}
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
                      <Link to={`/project/${this.props.projectId}/library/${this.props.libraryId}/suite/${suite._id}`}>
                        <input
                          style={{ color: "white" }}
                          type="text"
                          placeholder="New Suite"
                          onChange={this.onInputChange(index)}
                          onKeyPress={this.postOnEnter(index)}
                          onKeyDown={this.deleteOnBackspace(index)}
                          onClick={() => this.onSuiteClick(index)}
                          value={suite.suite_name}
                        />
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
          </nav>
        </div>
        {/* TESTCASE */}
        <div className="testcase container" style={{background:"lightgrey", width: "95%"}}>
          {(() => {
            if (window.location.pathname.split("/")[6]) {
              return (
                <div className="row">
                  <div className="col s8">
                    <table>
                      <tbody>
                        <tr>
                          <th data-field="tc">Test Cases / Steps</th>
                          <th data-field="state">Status</th>
                        </tr>
                      </tbody>
                    </table>
                    <TestCase {...this.props}/>


                    {/* {this.state.testCases.map(testCases => (
                      <TestCase
                        key={testCases._id}
                        {...this.props}
                        suiteId={this.props.suiteId}

                        tc_name={testCases.test_case}
                        tc_id={testCases._id}
                        tc_steps={testCases.test_steps}
                        // action = {this.showTestCases()}
                      />
                    ))} */}

                  </div>
                  <div className="col s4">
                  <table>
                    <tbody>
                      <tr>
                        <th data-field="tc">Add Case</th>
                      </tr>
                    </tbody>
                  </table>
                  <TestCaseForm {...this.props} tc_added={this.renderTest} />
                </div>
              </div>
            )}
          })()}
        </div>
      </Fragment>
    );
  }
}

export default Suite;
