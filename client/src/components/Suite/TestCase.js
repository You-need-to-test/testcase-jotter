import React, { Component, Fragment } from "react";
import API from "../../actions/API";

export default class TestCase extends Component {
  state = {
    cases: []
  };
  componentDidMount() {
    this.loadCase();
  }

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

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const body = {
      test_case : data.get("test_case")
    }
    await API.createTestCase(body)
  }

  render() {
    return (
      <Fragment>
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
