import { Form, Text, RadioGroup, Radio, Checkbox } from "react-form";
import React, { Component } from "react";
import API from "../../actions/API";

export default class TestCaseForm extends Component {
  state = {
    cases: [],
    steps: []
  };

  onSubmit = data => {
    data.suite_id = this.props.suiteId;
    API.postCase(data);
  };

  render() {
    return (
      <div>
        <Form onSubmit={submittedValues => this.onSubmit(submittedValues)}>
          {formApi => (
            <div>
              <form onSubmit={formApi.submitForm} id="dynamic-form">
                <RadioGroup field="gender"><Radio value="male" />        <Radio value="female" />
                </RadioGroup>
                <Checkbox field="agreesToTerms" />

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
      </div>
    );
  }
}
