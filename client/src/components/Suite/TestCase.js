import React, { Component, Fragment } from "react";
// import TestStep from "./TestStep";
// import TextInputField from '../TextInputField';
// import TestCaseApi from '../../api/TestCaseApi'
import API from "../../actions/API";


export default class TestCase extends Component {
  state = {
    cases: [],
    name: ''//
  };
  componentDidMount() {
    this.loadCase();
  }
  componentDidUpdate() {
    // console.log(this.props)
  }
  async loadCase() {
    const result = await API.getCases(this.props.suiteId);
    if (result.data) {
      const newState = result.data.map(cases => cases);
      this.setState({ cases: newState });
      console.log({"case_state":newState});
    }
  }

  renderTable() {
    return (
      <div>
        <table className={"striped"}>
          <tbody>
          {this.state.cases.map((cas, index) => {
            return (
              <tr key={index}>
                {this.state.cases[index].testcase}
                  {/* style={{ color: "black", background: "grey", "fontWeight":"bold"}} */}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }

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
    return (
      <Fragment>
        {/* {this.renderTable()} */}
        <div>
        <table className={"striped"}>
          <tbody>
          {this.state.cases.map((cas, index) => {
            return (
              <Fragment key={"case"+index}>
                <tr>
                  <td>
                    {cas.test_case}
                  </td>
                    {/* style={{ color: "black", background: "grey", "fontWeight":"bold"}} */}

                </tr>
                {cas.test_steps.map((step, i) => {
                  return(
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;{step}
                        {console.log("step",step)}
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
        // <div>
        // <Table className={"striped"}>
        //   <thead>
        //   <tr>
        //     <th data-field="tc">Test Case </th>
        //     <th data-field="ts">Test Step</th>
        //     <th data-field="state">Status</th>
        //   </tr>
        //   </thead>
        //   <tbody>
        //     <tr>
        //       <td tc_id ={tc_id}
        //           onChange={this.handleChange}>
        //         {tc_name}
        //       </td>
        //       {tc_steps ?
        //         tc_steps.map((steps, index) =>
        //           <tr key={index}>
        //             <td></td>
        //             <td>{steps}</td>
        //           </tr>
        //         )
        //         : null}
        //     </tr>
        //   </tbody>
        // </Table>
        // </div>
    // )
  }
}
