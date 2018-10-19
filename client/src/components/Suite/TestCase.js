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

  deleteCaseOnDelete = i => e => {
    if (e.keyCode === 8 && !this.state.cases[i]) {
      let cases = [
        ...this.state.cases.slice(0, i),
        ...this.state.cases.slice(i + 1)
      ];
      this.setState({ cases });
      if (e.target.parentNode.previousSibling) {
        e.target.parentNode.previousSibling.firstChild.focus();
      }
      e.preventDefault();
    }
  };

  addCaseOnEnter = i => e => {
    if (e.charCode === 13 && this.state.cases[i]) {
      this.state.cases.splice(i + 1, 0, "");
      if (e.target.parentNode.nextSibling) {
        e.target.parentNode.nextSibling.firstChild.focus();
      }
      let cases = this.state.cases;
      this.setState({ cases });
    }
  };

  render() {
    return (
      <div className="container testCase">
        {this.state.cases.map((testcase, index) => (
          <div className="input-field" key={index}>
            <input
              type="text"
              placeholder="Test Case"
              onChange={this.onInputChange(index)}
              onKeyPress={this.addCaseOnEnter(index)}
              onKeyDown={this.deleteCaseOnDelete(index)}
              value={testcase}
            />
            <TestStep/>
          </div>
        ))}
        <button type="submit">Submit</button>   

      </div>
    )
  }
}