import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const TestFormReview = ({ onBack, testValues, submitTest }) => {
//   const renderSteps = (testcase) => {
//       console.log(testcase)
//     return (
//       <div>
//         {testcase.steps.map((teststep, index) => {
//           <div key={teststep+index}>{teststep}</div>;
//         })}
//       </div>
//     );
//   };

  const renderCases = () => {
    console.log(testValues.cases);
    return (
      <div>
        {testValues.cases.map((testcase, index) => (
          <div key={testcase.case+index}>
            <div>Case: {testcase.case}</div>
            {/* {testcase.steps.map((teststep, i) => {
              <div key={teststep+i}>{teststep}</div>;
            })} */}
            {/* {renderSteps(testcase)} */}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h5>Review</h5>
      {renderCases()}
      <button onClick={onBack}>Back</button>
      <button onClick={() => submitTest(testValues)}>Post</button>
    </div>
  );
};

const mapStateToProps = state => {
  //   console.log(state.form.testForm.values);
  return { testValues: state.form.testForm.values };
};

export default connect(mapStateToProps, actions)(TestFormReview);
