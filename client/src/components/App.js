import React, { Component, Fragment } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import "./App.scss";

import * as actions from "../actions";
import Home from "./Home/Home";
import Project from "./Project/Project";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
 
  render() {
    return (
      <div>
        <BrowserRouter>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/project" component={Project} />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, actions)(App)