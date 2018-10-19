import React from "react";
import googleSignInLogo from '../../img/google_signin_logo.png';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button><a href="http://localhost:5000/auth/google"><img src={googleSignInLogo} alt="alt"/></a></button>
      {/* <button><a href="/auth/google"><img src={googleSignInLogo} alt="alt"/></a></button> */}
    </div>
  );
}
