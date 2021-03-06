import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Home from "./Home/Home";
import Project from "./Project/Project";


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div style={{ background: "#282C33"}}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact path="/project/"
              render={ props => <Project {...props} /> }
            />
            <Route
              path="/project/:pid/"
              render={ props => <Project {...props} projectId={props.match.params.pid} /> }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect( null, actions )(App);