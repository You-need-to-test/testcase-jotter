import React, { Component } from "react";
import TestCase from "./TestCase";

export default class TestSuite extends Component {
  state = {
    suites: ["Suite 1", "Suite 2"]
  };

  render() {
    return (
      <div className="container testSuite">
        <h4>Suite</h4>
        <TestCase />
      </div>
    );
  }
}
