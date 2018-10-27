import { Form, Text } from 'react-form';
import React, { Component } from "react";
import API from '../../actions/API'


export default class TestCaseForm extends Component {

  handleSubmit = async (submittedValues) => {
    console.log(submittedValues)
    // TestCaseApi.createTestCases(body);
    await API.createTestCase(submittedValues)
  };

  // handleKeyPress = (event, formApi, index) => {
  //   if(event.key == 'Enter'){
  //     console.log('enter press here! ')
  //     formApi.addValue('test_steps', '')
  //   }
  // }

// get value of test suit_id as prop from test suite, and pass it to the submitted values
  render() {

    return (
      <div>
        <Form
          onSubmit={submittedValues => this.handleSubmit(submittedValues)}>
          { formApi => (
            <div>
              <form onSubmit={formApi.submitForm} id="dynamic-form">
                <label htmlFor="dynamic-first">Test Case </label>
                <Text field="test_case" id="dynamic-first"
                      // onKeyPress={this.handleKeyPress(formApi)}
                />
                <button
                  onClick={() => formApi.addValue('test_steps', '')}
                  type="button"
                  className="mb-4 mr-4 btn btn-success">+</button>

                { formApi.values.test_steps && formApi.values.test_steps.map( ( test_step, i ) => (
                    <div key={`test_step${i}`}>
                      <label htmlFor={`test_step-name-${i}`}>Test Step</label>
                      <Text field={['test_steps', i]} id={`test_step-name-${i}`}
                            onKeyPress={this.handleKeyPress}
                      />
                      <button
                        onClick={() => formApi.removeValue('test_steps', i)}
                        type="button"
                        className="mb-4 btn btn-danger">X</button>
                    </div>
                ))}
                <button type="submit" className="mb-4 btn btn-primary">Submit</button>
              </form>
            </div>
          )}
        </Form>
      </div>
    );
  }
}