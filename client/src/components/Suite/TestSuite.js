import React, { Component } from "react";
// import { Tab, Tabs, TabList, TabPanel } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
// import TestCase from "./TestCase";
import TestForm from "./TestForm";
import TestFormReview from "./TestFormReview";

export default class TestSuite extends Component {
  state = {
    suites: ["Suite 1", "Suite 2"],
    showReview: false
  };

  renderContent() {
    if (this.state.showReview) {
      return <TestFormReview onBack={() => this.setState({ showReview: false })}/>
    }
    return <TestForm onFinish={() => this.setState({ showReview: true })}/>
  }

  render() {
    return (
      <div className="testSuite" style={{width:"700px"}}>        
        {this.renderContent()}

        {/*this can be cleaned using maps, which can iterate over the suite array*/}
        {/* <Tabs
          defaultTab="one"
          onChange={(tabId) => { console.log(tabId) }}
          vertical={false}
        >
          <TabList>
            <Tab tabFor="one" >Suite 1</Tab>
            <Tab tabFor="two">Suite 2</Tab>
            <Tab tabFor="three">Suite 3</Tab>
            <Tab tabFor="four">Suite 4</Tab>
            <Tab tabFor="five">Suite 5</Tab>
            <Tab tabFor="six">Suite 6</Tab>
            <Tab tabFor="seven">Suite 7</Tab>
          </TabList>
          <TabPanel tabId="one">
            <h1>Suite 1</h1>
            <TestCase/>
          </TabPanel>
          <TabPanel tabId="two">
            <h1>Suite 2</h1>
            <TestCase/>
          </TabPanel>
          <TabPanel tabId="three">
            <h1>Suite 3</h1>
            <TestCase/>
          </TabPanel><TabPanel tabId="four">
            <h1>Suite 4</h1>
            <TestCase/>
          </TabPanel><TabPanel tabId="five">
            <h1>Suite 5</h1>
            <TestCase/>
          </TabPanel><TabPanel tabId="six">
            <h1>Suite 6</h1>
            <TestCase/>
          </TabPanel><TabPanel tabId="seven">
            <h1>Suite 7</h1>
            <TestCase/>
          </TabPanel>
        </Tabs> */}
      </div>
    );
  }
}
