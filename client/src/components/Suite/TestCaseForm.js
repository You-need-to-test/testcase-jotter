// import { Form, Text } from "react-form";
// import React, { Component } from "react";
// import API from "../../actions/API";

// export default class TestCaseForm extends Component {
//   state = {
//     steps: [],
//     tc_added: false
//   };

//   onFormSubmit = data => {
//     data.suite_id = this.props.suiteId;
//     API.postCase(data);
//   };
//   renderForm() {
//     return (
//       <div>
      
//       <Form onSubmit={submittedValues => this.onFormSubmit(submittedValues)}>
//         {formApi => (
//           <div>
//             <form onSubmit={formApi.submitForm} id="dynamic-form">
//               <label htmlFor="testcaseForm">Test Case </label>
//               <Text
//                 field="test_case"
//                 id="testcaseForm"
//                 onKeyDown={e => {
//                   if (e.ctrlKey) {
//                     formApi.addValue("test_steps", "");
//                   }
//                 }}
//               />
//               <button
//                 onClick={() => formApi.addValue("test_steps", "")}
//                 type="button"
//                 className="mb-4 mr-4 btn btn-success"
//               >+
//               </button>

//               {formApi.values.test_steps &&
//                 formApi.values.test_steps.map((test_step, i) => (
//                   <div key={`test_step${i}`} className="container">
//                     <label htmlFor={`test_step-name-${i}`}>Test Step</label>
//                     <Text
//                       field={["test_steps", i]}
//                       id={`test_step-name-${i}`}
//                       onKeyDown={e => {
//                         if (e.altKey) {
//                           formApi.removeValue("test_steps", i);
//                         } else if (e.ctrlKey) {
//                           formApi.addValue("test_steps", "");
//                         }
//                       }}
//                     />
//                     <button
//                       onClick={() => formApi.removeValue("test_steps", i)}
//                       type="button"
//                       className="mb-4 btn btn-danger"
//                     >
//                       x
//                     </button>
//                     <button
//                       onClick={() => formApi.addValue("test_steps", "")}
//                       type="button"
//                       className="mb-4 mr-4 btn btn-success"
//                     >
//                       +
//                     </button>
//                   </div>
//                 ))}
//               <button type="submit" className="mb-4 btn btn-primary">
//                 Submit
//               </button>
//             </form>
//           </div>
//         )}
//       </Form>
//       </div>
//     );
//   }

//   render() {
//     return (
//       <div>
//         <table>
//           <tbody>
//             <tr>
//               <th data-field="tc">Add Case</th>
//             </tr>
//           </tbody>
//         </table>
//         {this.renderForm()}
//       </div>
//     )
//   }
// }
