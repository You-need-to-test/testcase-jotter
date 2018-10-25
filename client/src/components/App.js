import React, { Component, Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import "materialize-css/dist/css/materialize.min.css";
import "./App.scss";
import API from "../actions/API";
import Home from "./Home/Home";
import Project from "./Project/Project";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  postProject(data) {
    API.postProject(data).catch(err => console.log(err));
    // .then( this.loadArticles() );
  }

  getProject() {
    API.getProject().catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route
              path="/project"
              render={props => (
                // <Project {...props} postProject={data => this.postProject(data)} />
                // <Project {...props} postProject={() => this.getProject()} />
                <Project {...props} />
              )}
            />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
