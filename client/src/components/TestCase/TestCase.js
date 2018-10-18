import React, { Component } from "react";
import TestStep from "../TestStep/TestStep";

export default class TestCase extends Component {
  state = {
    numCases: 1,
    numSteps: 0
  }

  createTestStep() {
    return <TestStep/>
  }
  
  async onEnter(event) {
    if (event.charCode === 13) {
      await this.setState({numSteps: this.state.numSteps + 1})
      this.createTestStep()

      console.log(this.state.numSteps)
    }
  }

  render() {
    return (
      <div className="container">
          <label>TestCase</label>
          <input name="testcase" 
            onKeyPress = {(event) => this.onEnter(event)}
          />

        {this.createTestStep()}
      </div>
    );
  }
}
