import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import TestCase from "./TestCase";
import TestForm from "./TestForm";
import TestFormReview from "./TestFormReview";
import TestCaseApi from '../../api/TestCaseApi';
import TestCaseForm from './TestCaseForm';
import TestCase1 from './TestCase1'
import {Row, Col} from 'react-materialize'


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
    console.log(this.state.testCases)
  }


  renderContent() {
    if (this.state.showReview) {
      return <TestFormReview onBack={() => this.setState({ showReview: false })}/>
    }
    return <TestForm onFinish={() => this.setState({ showReview: true })}/>
  }

  render() {
    return (
      <div className="testSuite">
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
            >Show Test cases</Tab>
            <Tab
              tabFor="two"
            >Create Test cases
            </Tab>
          </TabList>
          <TabPanel tabId="one">
            {/*loop over testCases, and display each result*/}
            <div>
              <Row>
                <Col s={5}>
                  <TestCaseForm/>

                </Col>
                <Col s={7}>
                  {this.state.testCases.map(testCases =>
                    <TestCase
                      tc_name={testCases.test_case}
                      tc_id={testCases._id}
                      tc_steps={testCases.test_steps}
                      key={testCases._id}
                      // action = {this.showTestCases()}
                    />)}
                </Col>
              </Row>
            </div>


            {/*<TestCase/>*/}
            {/*<TestCase1/>*/}
          </TabPanel>
          <TabPanel tabId="two">
            <TestCaseForm/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
