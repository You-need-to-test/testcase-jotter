import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

const renderField = ({ input, label, type }) => (
  <div className="col s11">
    <div>
      <input {...input} type={type} placeholder={label} />
    </div>
  </div>
);

const renderSteps = ({ fields }) => (
  <div className="container">
    {fields.map((step, index) => (
      <div className="row" key={index}>
        <button className="col s1" type="button" onClick={() => fields.remove(index)}>
          X
        </button>
        <Field className="col s11"
          name={step}
          type="text"
          component={renderField}
          label={`Step ${index + 1}`}
        />
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>
      Add Steps
    </button>
  </div>
);

const renderCases = ({ fields }) => (
  <div>
    {fields.map((testCase, index) => (
      <div className="row" key={index}>
        <button className="col s1" type="button" title="" onClick={() => fields.remove(index)}>
          X
        </button>
        <Field className="col s11"
          name={`${testCase}.case`}
          type="text"
          component={renderField}
          label={`Case ${index + 1}`}
        />
        <FieldArray name={`${testCase}.steps`} component={renderSteps} />
      </div>
    ))}
    <button className="col" style={{"marginTop": "20px"}} type="button" onClick={() => fields.push({})}>
      Add Cases
    </button>
  </div>
);

class TestForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(value => console.log(value))}>
          <FieldArray name="cases" component={renderCases} />
          <div className="row" style={{"marginTop": "20px"}}>
            <button
              className="col 6"
              type="button"
              disabled={this.props.pristine || this.props.submitting}
              onClick={this.props.reset}
            >
              Clear ALL Values
            </button>
            <button
              className="col 6"
              type="submit"
              disabled={this.props.submitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "MyForm"
})(TestForm);
