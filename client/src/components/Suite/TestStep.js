import React, { Component } from "react";

export default class TestCase extends Component {
  state = {
    steps: ["Step 1", "Step 2"]
  };
  onInputChange = i => e => {
    let steps = [...this.state.steps];
    steps[i] = e.target.value;
    this.setState({ steps });
  };
  onDelete = i => e => {
    e.preventDefault();
    let steps = [
      ...this.state.steps.slice(0, i),
      ...this.state.steps.slice(i + 1)
    ];
    this.setState({ steps });
  };
  addStepOnEnter = i => e => {
    if (e.charCode === 13 && this.state.steps[i]) {
      this.state.steps.splice(i + 1, 0, "");
      // console.log(e.target.nextSibling.nextSibling)
      let steps = this.state.steps;
      this.setState({ steps });
    }
  };

  render() {
    return (
      <div className="container testStep">
        {this.state.steps.map((step, index) => (
          <div className="input-field" key={index}>
            <input
              type="text"
              placeholder="Test Step"
              onChange={this.onInputChange(index)}
              onKeyPress={this.addStepOnEnter(index)}
              // onKeyPress={this.deleteStepOnDelete(index)}
              value={step}
            />
            <button onClick={this.onDelete(index)}>X</button>
          </div>
        ))}
      </div>
    );
  }
}
