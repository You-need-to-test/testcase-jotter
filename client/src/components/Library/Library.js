// import React from "react";
// import Suite from "../Suite/TestSuite";
// import { Tab, Tabs, TabList, TabPanel } from "react-web-tabs";
// // import { Link, Route } from "react-router-dom";

// import "react-web-tabs/dist/react-web-tabs.css";

// export default function Library(props) {
//   return (
//     <div>
//       <p>Library (for project: {props.projectId})</p>
//       {/* <Link to="/project/1">Library1</Link>
//       <Link to="/project/2">Library2</Link>
//       <Link to="/project/3">Library3</Link>

//       <Route
//         path={`${this.props.match.url}/1`}
//         render={props => {
//           console.log("Project1");
//           return <Library {...props} />;
//         }}
//       />
//       <Route
//         path={`${this.props.match.url}/2`}
//         render={props => {
//           console.log("Project2");
//           return <Library {...props} />;
//         }}
//       />
//       <Route
//         path={`${this.props.match.url}/3`}
//         render={props => {
//           console.log("Project3");
//           return <Library {...props} />;
//         }}
//       /> */}

//       <Tabs
//         defaultTab="one"
//         onChange={(tabId) => { console.log(tabId) }}
//         vertical={true}
//       >
//         <TabList>
//           <Tab tabFor="one">Library 1</Tab>
//           <Tab tabFor="two">Library 2</Tab>
//           <Tab tabFor="three">Library 3</Tab>
//         </TabList>
//         <TabPanel tabId="one">
//           <Suite/>
//         </TabPanel>
//         <TabPanel tabId="two">
//           <Suite/>
//         </TabPanel>
//         <TabPanel tabId="three">
//           <Suite/>
//         </TabPanel>
//       </Tabs>
//     </div>
//   );
// }


import React, { Component } from "react";
import Suite from "../Suite/TestSuite";
import { Link, Route } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";
import API from "../../actions/API";

class Library extends Component {

  state = {
    libraries: ["L1","L2","L3"],
    selectedLibrary: null
  }

  componentDidUpdate() {
    // console.log(this.props)
    // console.log(this.props.match.url);
    // console.log(`${this.props.match.url}/library/${this.state.selectedLibrary}`);
    // console.log(this.state.selectedLibrary);
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

  async loadLibrary() {
    // const result = await API.getProjects();
    // console.log(result.data)
    // const newState = result.data.map(name => {
    //   return name.project_name
    // })
    // this.setState({projects: newState});
  }

  updateOnEnter = i => async e => {
    if (e.charCode === 13 && this.state.libraries[i]) {
      /** SEARCH RESULT */
      // const searchResult = await API.searchProject(i+1);
      // if (searchResult.data) {
        /** UPDATE RESULT */
        // await API.updateProject({'project_name': this.state.projects[i]}, i+1);
      // } else {
        /** POST RESULT */
        // await API.postProject({
        //   'library_name': this.state.libraries[i],
        //   'library_index': `l${i+1}`
        // })
      // }
      // this.loadProject();
    }
  };

  render() {
    return (
      <div className="row">
        <h1>Project {this.props.projectId} / Library </h1>
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
              <Link to={`${this.props.match.url}/library/${index+1}`}>
              {/* <Link to={`${this.props.match.url}/${index+1}`}> */}
                <input
                  type="text"
                  placeholder="New Library"
                  onChange={this.onInputChange(index)}
                  // onKeyPress={this.updateOnEnter(index)}
                  // onKeyDown={this.deleteOnBackspace(index)}
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
      </div>
    )
  }
}

export default Library;