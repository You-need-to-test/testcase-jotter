import React, { Component, Fragment } from "react";
import { Form, Text } from "react-form";

import API from "../../actions/API";

export default class TestCase extends Component {
  state = {
    cases: [],
    steps: [],
    tc_added: false
  };

  componentWillReceiveProps(nextProps) {
    this.loadCase(nextProps);
  }

  async loadCase() {
    const result = await API.getCases(this.props.suiteId);
    if (result.data) {
      const newState = result.data.map(cases => cases);
      this.setState({ cases: newState });
      // console.log({"case_state":newState});
    }
  }

  // FORM
  onFormSubmit = async (data) => {
    data.suite_id = this.props.suiteId;
    await API.postCase(data);
    this.loadCase();
  };

  renderForm() {
    return (
      <Form onSubmit={submittedValues => this.onFormSubmit(submittedValues)}>
        {formApi => (
          <div>
            <form onSubmit={formApi.submitForm} id="dynamic-form">
              <label htmlFor="testcaseForm">Test Case </label>
              <Text
                field="test_case"
                id="testcaseForm"
                onKeyDown={e => {
                  if (e.ctrlKey) {
                    formApi.addValue("test_steps", "");
                  }
                }}
              />
              <button
                onClick={() => formApi.addValue("test_steps", "")}
                type="button"
                className="mb-4 mr-4 btn btn-success"
              >+
              </button>

              {formApi.values.test_steps &&
                formApi.values.test_steps.map((test_step, i) => (
                  <div key={`test_step${i}`} className="container">
                    <label htmlFor={`test_step-name-${i}`}>Test Step</label>
                    <Text
                      field={["test_steps", i]}
                      id={`test_step-name-${i}`}
                      onKeyDown={e => {
                        if (e.altKey) {
                          formApi.removeValue("test_steps", i);
                        } else if (e.ctrlKey) {
                          formApi.addValue("test_steps", "");
                        }
                      }}
                    />
                    <button
                      onClick={() => formApi.removeValue("test_steps", i)}
                      type="button"
                      className="mb-4 btn btn-danger"
                    >
                      x
                    </button>
                    <button
                      onClick={() => formApi.addValue("test_steps", "")}
                      type="button"
                      className="mb-4 mr-4 btn btn-success"
                    >
                      +
                    </button>
                  </div>
                ))}
              <button type="submit" className="mb-4 btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )}
      </Form>
    );
  }

  render() {
    return (
      <Fragment>
        
        <div className="caseform col s5">
        <table>
          <tbody>
            <tr>
              <th data-field="tc"
                style={{textAlign:"center",fontFamily: "Delius Swash Caps, cursive" ,fontSize: "20px", color: "#D35C54"
                }}
              >Add Case</th>
            </tr>
          </tbody>
        </table>
        {this.renderForm()}
        </div>
        <div className="case col s7">
          <table>
            <tbody>
              <tr>
                <th data-field="tc"
                    style={{textAlign:"center",fontFamily: "Delius Swash Caps, cursive" ,fontSize: "20px",  color: "#D35C54"
                    }}                >Test Cases / Steps</th>
                <th data-field="state"
                    style={{textAlign:"center",fontFamily: "Delius Swash Caps, cursive" ,fontSize: "20px",  color: "#D35C54"
                    }}
                >Status</th>
              </tr>
            </tbody>
          </table>
          <table className={"striped"}>
            <tbody>
            {this.state.cases.map((cas, index) => {

              return (
                <Fragment key={"case"+index}>
                  <tr>
                    <td>
                      {cas.test_case}
                    </td>
                  </tr>
                  {cas.test_steps.map((step, i) => {
                    return(
                      <tr key={i}>
                        <td>
                          &nbsp;&nbsp;&nbsp;&nbsp;{step}
                        </td>
                      </tr>
                    )
                  })}
                </Fragment>
              )
            })}
            </tbody>
          </table>
        </div>
      </Fragment>
    )
  }
}
