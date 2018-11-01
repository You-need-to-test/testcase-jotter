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
            <form onSubmit={formApi.submitForm} id="dynamic-form"
                  style={{
                    border: "1px solid grey",
                    height: "100%",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "10px"
                  }}
            >
              <label htmlFor="testcaseForm">Test Case </label>

              <Text
                field="test_case"
                id="testcaseForm"
                style={{height: "35px", color: "#4D93DB"}}
                onKeyDown={e => {
                  if (e.ctrlKey) {
                    formApi.addValue("test_steps", "");
                  }
                }}
              />
              <span className="helper-text" style={{color: "#87B96F" ,fontSize: "9px"}}>Press <em>CTLR</em> to add steps, and <em>ALT</em> to delete</span>

              {/*<button*/}
                {/*onClick={() => formApi.addValue("test_steps", "")}*/}
                {/*type="button"*/}
                {/*className="mb-4 mr-4 btn btn-success"*/}
                {/*style={{display: "inline-block"}}*/}
              {/*>+*/}
              {/*</button>*/}

              {formApi.values.test_steps &&
                formApi.values.test_steps.map((test_step, i) => (
                  <div key={`test_step${i}`} className="container">
                    <label htmlFor={`test_step-name-${i}`}>Test Step </label>
                    <Text
                      field={["test_steps", i]}
                      id={`test_step-name-${i}`}
                      style={{color:"#C2965B", height: "35px"}}
                      onKeyDown={e => {
                        if (e.altKey) {
                          formApi.removeValue("test_steps", i);
                        } else if (e.ctrlKey) {
                          formApi.addValue("test_steps", "");
                        }
                      }}
                    />

                    {/*<button*/}
                      {/*onClick={() => formApi.removeValue("test_steps", i)}*/}
                      {/*type="button"*/}
                      {/*className="mb-4 btn btn-danger"*/}
                    {/*>*/}
                      {/*x*/}
                    {/*</button>*/}
                    {/*<button*/}
                      {/*onClick={() => formApi.addValue("test_steps", "")}*/}
                      {/*type="button"*/}
                      {/*className="mb-4 mr-4 btn btn-success"*/}
                    {/*>*/}
                      {/*+*/}
                    {/*</button>*/}
                  </div>
                ))}
              <div
              style={{
              height: "100%",
              width: "100%",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop:"20px"
              }}>
                <button type="submit" className="mb-4 btn btn-primary">
                  Submit
                </button>


              </div>

            </form>
          </div>
        )}
      </Form>
    );
  }

  render() {
    return (
      <Fragment>
        
        <div className="caseform col s5"
        >
        <table
        >
          <tbody>
            <tr>
              <th data-field="tc"
                style={{textAlign:"center",fontFamily: "Delius Swash Caps, cursive" ,fontSize: "20px", color: "#D35C54"
                }}
              >Add Test Case</th>
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
                    }}                >Test Cases </th>
                <th data-field="tc"
                    style={{textAlign:"center",fontFamily: "Delius Swash Caps, cursive" ,fontSize: "20px",  color: "#D35C54"
                    }}                >Test Steps</th>
                {/* <th data-field="state"
                    style={{textAlign:"center", fontFamily: "Delius Swash Caps, cursive" ,fontSize: "20px",  color: "#D35C54"
                    }}
                >Status</th> */}
              </tr>
            </tbody>
          </table>
          <table className={"responsive-table"}>
            <tbody
              style={{
                border: "1px solid grey",
                height: "100%",
                borderRadius: "5px",
                padding: "10px",
                margin: "10px"
              }}
            >
            {this.state.cases.map((cas, index) => {

              return (
                <Fragment key={"case"+index}>
                  <tr>
                    <td                 style={{height: "35px", color: "#4D93DB", textAlign:"center"}}
                    >
                      {this.state.cases.length - index}. {cas.test_case}
                    </td>
                    {cas.test_steps.map((step, i) => {
                      return(
                        <tr>
                        <td key={i}
                            style={{color:"#C2965B", height: "35px"}}
                        >
                            {step}
                        </td>
                        </tr>
                      )
                    })}
                  </tr>

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
