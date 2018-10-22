import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class TestForm extends Component {
  state = {
    cases: ["Case1"]
  };

  renderField() {
    return (
      <div className="row" style={{ margin: "0", padding: "0" }}>
        {this.state.cases.map((testcase, index) => (
          <div key={index}>
            <label className="col s2">{"Case"+(index+1)}</label>
            <Field
              className="col s10"
              name={"Case"+(index+1)}
              type="text"
              component="input"
              value={testcase}
              onKeyPress={this.addCaseOnEnter(index)}
              onKeyDown={this.deleteCaseOnDelete(index)}
            />
          </div>
        ))}
      </div>
    );
  }

  deleteCaseOnDelete = i => e => {
    if (e.keyCode === 8 && !this.state.cases[i]) {
      let cases = [
        ...this.state.cases.slice(0, i),
        ...this.state.cases.slice(i + 1)
      ];
      this.setState({ cases });
    //   if (e.target.parentNode.previousSibling) {
    //     e.target.parentNode.previousSibling.firstChild.focus();
    //   }
      e.preventDefault();
    }
  };

  addCaseOnEnter = i => e => {
    if (e.charCode === 13 && this.state.cases[i]) {
      let caseState = this.state.cases;
      caseState.splice(i + 1, 0, "");
      caseState[i + 1] = "Case" + (i + 2);
      this.setState({ caseState });
    }
    // if (e.target.parentNode.nextSibling) {
    //   e.target.parentNode.nextSibling.firstChild.focus();
    // }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(value => console.log(value))}>
          {this.renderField()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "testForm"
})(TestForm);
