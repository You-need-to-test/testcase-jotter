import React, { Component } from "react";
import TestStep from "./TestStep";
import TextInputField from '../TextInputField';
import TestCaseApi from '../../api/TestCaseApi'
import API from "../../actions/API";
import TestSuite from './TestSuite'


export default class TestCase extends Component {
  state = {
    name: '',
  };

  // componentDidMount = async () => {
  //   this.setState({ loading: true });
  //   console.log(this.state.loading);
  //   const testCases = await TestCaseApi.getTestCases();
  //   this.setState({ testCases, loading: false })
  // };

  // ComponentDidUpdate= function() {
  //   console.log(this.state.testCases);
  //   console.log(this.state.loading);
  // };
  //
  // onInputChange = i => e => {
  //   let cases = [...this.state.cases];
  //   cases[i] = e.target.value;
  //   this.setState({ cases });
  // };
  //
  // deleteCaseOnDelete = i => e => {
  //   if (e.keyCode === 8 && !this.state.cases[i]) {
  //     let cases = [
  //       ...this.state.cases.slice(0, i),
  //       ...this.state.cases.slice(i + 1)
  //     ];
  //     this.setState({ cases });
  //     // if (e.target.parentNode.previousSibling) {
  //     //   e.target.parentNode.previousSibling.firstChild.focus();
  //     // }
  //     e.preventDefault();
  //   }
  // };
  //
  // addCaseOnEnter = i => e => {
  //   if (e.charCode === 13 && this.state.cases[i]) {
  //     let caseState = this.state.cases;
  //     caseState.splice(i + 1, 0, "");
  //     caseState[i + 1] = "Case" + (i + 2);
  //     this.setState({ caseState });
  //     // if (e.target.parentNode.nextSibling) {
  //     //   console.log(e.target.parentNode.nextSibling)
  //     //   e.target.parentNode.nextSibling.firstChild.focus();
  //     // }
  //   }
  // };
  //
  // renderCase() {
  //   return (
  //     this.state.cases.map((testcase, index) => (
  //       <div className="input-field" key={index}>
  //         <input
  //           type="text"
  //           placeholder="Test Case"
  //           onChange={this.onInputChange(index)}
  //           onKeyPress={this.addCaseOnEnter(index)}
  //           onKeyDown={this.deleteCaseOnDelete(index)}
  //           value={testcase}
  //         />
  //         <TestStep />
  //       </div>
  //     ))
  //   )
  // }
  handleChange = (event) => {
    this.setState({name: event.target.value});
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const body = {
      test_case : data.get("test_case")
    }
    console.log(body)
    // TestCaseApi.createTestCases(body);
    await API.createTestCase(body)
  }

  render() {
    const {tc_id, tc_name, tc_steps} = this.props;
    let div = (
      <div>
        <h1
          tc_id ={tc_id}
          onChange={this.handleChange}>
          {tc_name}
        </h1>
        {tc_steps ?
            tc_steps.map((steps, index) =>
              <p key={index}>
                {steps}
              </p>
            )
            : null}
      </div>
    )
    return div;
  }
}
