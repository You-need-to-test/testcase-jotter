import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

const renderField = ({ input, label, type, meta: { touch, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touch && error && <span>{error}</span>}
    </div>
  </div>
);

const renderSteps = ({ fields, meta: { error } }) => (
  <div>
    <button type="button" onClick={() => fields.push()}>
      Add Steps
    </button>
    {fields.map((step, index) => (
      <div className="row" key={index}>
        <Field
          className="col s8"
          name={step}
          type="text"
          component={renderField}
          label={`Step ${index + 1}`}
        />
        <button
          className="col s2"
          type="button"
          onClick={() => fields.remove(index)}
        >
          X
        </button>
      </div>
    ))}
    {error && <li className="error">{error}</li>}
  </div>
);

const renderCases = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Cases
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((testCase, index) => (
      <li key={index}>
        <Field
          name={`${testCase}.case`}
          type="text"
          component={renderField}
          label={`Case ${index + 1}`}
        />
        <button type="button" title="" onClick={() => fields.remove(index)}>
          X
        </button>
        <FieldArray name={`${testCase}.steps`} component={renderSteps} />
      </li>
    ))}
  </ul>
);

const TestForm = ({ handleSubmit, pristine, reset, submitting }) => {
  return (
    <div className="container">
      <form onSubmit={handleSubmit(value => console.log(value))}>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear ALL Values
        </button>
        <FieldArray name="cases" component={renderCases} />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <div>
      </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "MyForm"
})(TestForm);
