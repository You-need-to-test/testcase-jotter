import React, { Component, Fragment } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

import logo from "../img/logo.svg";
import googleSignInLogo from "../img/google_signin_logo.png";

import "./App.scss";
import Home from "./Home/Home";
import Project from "./Project/Project";

class App extends Component {

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

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <a href="http://localhost:5000/auth/google"><div><img src={googleSignInLogo}/></div></a>
      //     <a href="http://localhost:5000/api/logout"><button type="button" class="btn btn-dark">Logout</button></a>
      //     <a href="http://localhost:5000/api/current_user"><button type="button" class="btn btn-primary">Current User</button></a>
      //   </header>
      // </div>
    );
  }
}

export default App;
