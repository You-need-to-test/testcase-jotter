import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import TestCase from "./TestCase";
import TestForm from "./TestForm";
import TestFormReview from "./TestFormReview";
import TestCaseApi from '../../api/TestCaseApi'

export default class TestSuite extends Component {

  state = {
    suites: ["Suite 1", "Suite 2"],
    testCases : [],
  };

  showTestCases = async () => {
    const testCases = await TestCaseApi.getTestCases();
    this.setState({
      testCases,

    })
  }


  renderContent() {
    if (this.state.showReview) {
      return <TestFormReview onBack={() => this.setState({ showReview: false })}/>
    }
    return <TestForm onFinish={() => this.setState({ showReview: true })}/>
  }

  render() {
    return (
      <div className="testSuite" style={{width:"700px"}}>        
        {/*{this.renderContent()}*/}

        {/* this can be cleaned using maps, which can iterate over the suite array*/}
        <Tabs
          defaultTab="one"
          onChange={(tabId) => { console.log(tabId) }}
          vertical={false}
        >
          <TabList>
            <Tab tabFor="one"
                 onClick={this.showTestCases}
            >Suite 1</Tab>
          </TabList>
          <TabPanel tabId="one">
            {/*loop over testCases, and display each result*/}
            {this.state.testCases.map(testCases =>
              <TestCase
                name={testCases.test_case}
                tc_id={testCases._id}
                key={testCases._id}
                // action = {this.showTestCases()}
              />)}
            <TestCase/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
