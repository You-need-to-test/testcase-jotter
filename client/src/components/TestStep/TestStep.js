import React, { Component } from "react";

export default class TestStep extends Component {
  state = {
    steps: ['Step 1','Step 2']
  }

  onInputChange = i => e => {
    let steps = [...this.state.steps];
    steps[i] = e.target.value;
    this.setState({ steps })
  }

  deleteStepOnDelete = i => e => {
    if (e.keyCode === 8 && !this.state.steps[i]) {
      let steps = [...this.state.steps.slice(0, i), ...this.state.steps.slice(i + 1)];
      this.setState({ steps })
      if(e.target.parentNode.previousSibling) {
        e.target.parentNode.previousSibling.firstChild.focus();
      }
      e.preventDefault();
    }
  }

  addStepOnEnter = i =>  e => {
    if (e.charCode === 13 && this.state.steps[i]) {
      this.state.steps.splice(i+1, 0, '');
      if(e.target.parentNode.nextSibling) {
        e.target.parentNode.nextSibling.firstChild.focus();
      }
      let steps = this.state.steps;
      this.setState({ steps })
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.steps.map((step, index) => (
          <div className="input-field" key={index}>
            <input
              style={{margin: '0', padding: '0'}}
              type="text"
              placeholder="Test Step"
              onChange={this.onInputChange(index)}
              onKeyPress={this.addStepOnEnter(index)}
              onKeyDown={this.deleteStepOnDelete(index)}
              value={step}
            />
          </div>
        ))}
      </div>
    )
  }
}