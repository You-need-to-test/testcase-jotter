import React from "react";
import googleSignInLogo from '../../img/google_signin_logo.png';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <a href="http://localhost:5000/auth/google"><div><img src={googleSignInLogo}/></div></a>
    </div>
  );
}
