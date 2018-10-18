import React, { Component } from "react";
import TestStep from "./TestStep";

export default class TestCase extends Component {
  state = {
    cases: ['Case 1','Case 2'],
  }

  onInputChange = i => e => {
    let cases = [...this.state.cases];
    cases[i] = e.target.value;
    this.setState({ cases })
  }
  onDelete = i => e => {
    e.preventDefault();
    let cases = [...this.state.cases.slice(0, i), ...this.state.cases.slice(i + 1)]
    this.setState({ cases })
  }
  addStepOnEnter = i =>  e => {
    if (e.charCode === 13 && this.state.cases[i]) {
      this.state.cases.splice(i+1, 0, '');
      // console.log(e.target.nextSibling.nextSibling)
      let cases = this.state.cases;
      this.setState({ cases })
    }
  }

  render() {
    return (
      <div className="container testCase">
        {this.state.cases.map((testcase, index) => (
          <div className="input-field" key={index}>
            <input
              type="text"
              placeholder="Test Case"
              onChange={this.onInputChange(index)}
              onKeyPress={this.addStepOnEnter(index)}
              // onKeyPress={this.deleteStepOnDelete(index)}
              value={testcase}
            />
            <button onClick={this.onDelete(index)}>X</button>   
            <TestStep/>
          </div>
        ))}
        <button type="submit">Submit</button>   

      </div>
    )
  }
}