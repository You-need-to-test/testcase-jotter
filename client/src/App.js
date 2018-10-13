import React, { Component } from "react";
import "./App.scss";

import logo from "./img/logo.svg";
import googleSignInLogo from "./img/google_signin_logo.png";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a href="http://localhost:5000/auth/google"><div><img src={googleSignInLogo}/></div></a>
          <a href="http://localhost:5000/api/logout"><button type="button" class="btn btn-dark">Logout</button></a>
          <a href="http://localhost:5000/api/current_user"><button type="button" class="btn btn-primary">Current User</button></a>
        </header>
      </div>
    );
  }
}

export default App;
