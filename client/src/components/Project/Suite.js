import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";
import API from "../../actions/API";

class Suite extends Component {

  state = {
    suites: [],
    selectedSuite: "",
    scases: [],
    caseLoaded: false
  }

  componentDidMount() {
    this.loadSuite();
    // console.log({"Suite/this.props": this.props})
  }

  componentDidUpdate() {
    // console.log({"Suite/this.props": this.props})
    // console.log(this.state.suites)
  }
  
//   componentWillReceiveProps(nextProps){
//     if(window.location.href.match(/suite\/undefined/g)) {
//       console.log("Pausing on suite loading to add new value");
//     } else {
//     //   this.loadSuite(nextProps);
//     }
//   }

  async loadSuite() {
    const result = await API.getSuites(this.props.libraryId);
    // console.log("libId",this.props.libraryId)
    // console.log(result.data)
    if(result.data) {
      const newState = result.data.map(suite => suite)
      this.setState({suites: newState});
    //   console.log({"suite_state":newState});
    }
  }

  addSuiteOnClick() {
    let newState = this.state.suites;
    newState.push({'suite_name':''});
    this.setState({ suites: newState });
  }

  onInputChange = i => e => {
    let suites = [...this.state.suites];
    suites[i].suite_name = e.target.value;
    this.setState({ suites });
  };
  
  onProjectClick = i => {
    if(this.state.suites){
      this.setState({ selectedSuite: this.state.suites[i] })
    //   console.log(this.state.suites[i])
    }
  }

  postOnEnter = i => async e => {
    if (e.charCode === 13 && this.state.suites[i]) {
      if (!this.state.suites[i]._id) {
        await API.postSuite({
          'suite_name': this.state.suites[i].suite_name,
          'library_id': this.props.libraryId
        })
      } else {
        console.log(this.state.suites[i].suite_name)

        await API.updateSuite(
          {'suite_name': this.state.suites[i].suite_name}, 
          this.state.suites[i]._id
        );
      }
    //   this.loadSuite();
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

  render() {
    return (
      <div className="1">
        {/* <h1>Project {this.props.projectId} / Library {this.props.match.params.lId} </h1> */}
        {/* LIBRARIES */}
        <p>
          <a onClick={() => this.addSuiteOnClick()} 
            className="btn-floating btn-small waves-effect waves-light grey">
            <i className="tiny material-icons">add</i>
          </a> Suite <b>{this.state.selectedSuite.suite_name}</b>
        </p>
        <ul className="suite-section">
          {this.state.suites.map((suite, index) => (
            <li key={index}>
              <Link to={`/project/${this.props.projectId}/library/${this.props.libraryId}/suite/${suite._id}`}>
                <input
                  type="text"
                  placeholder="New Suite"
                  onChange={this.onInputChange(index)}
                  onKeyPress={this.postOnEnter(index)}
                  onKeyDown={this.deleteOnBackspace(index)}
                //   onClick={() => this.onProjectClick(index)}
                  value={suite.suite_name}
                />
              </Link>
            </li>
          ))}
        </ul>
        {/* TESTCASE */}
        {/* <div className="1">
          { (() => {
              if(!this.state.libraryLoaded){
                // LOAD DEFAULT
                return (<NewSuite {...this.props} />)
                return <div/>
              }
              else {
                return (
                  <Route
                    path={`${this.props.match.url}/suite/:sId`}
                    render={ props => <NewSuite {...this.props} {...props} suiteId={props.match.params.sId}/> }
                  />
                )
                return <div/>
              }
            })()
          }
        </div> */}
      </div>
    )
  }
}

export default Suite;