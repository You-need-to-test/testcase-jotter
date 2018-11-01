import React from "react";
import googleSignInLogo from '../../img/google_signin_logo.png';
// import LoginPage from './LoginPage'
import test_quire from "../../img/test_quire.png";

export default function Home() {
  return (
    <div>
      <div className="center" style={{width: "100%", height:"15vh"}}>
        <img src={test_quire} alt={""} style={{ height: "100px", width: "600px" }} />
      </div>
      <div style={{width: "100%", height:"70vh"}}>
        <iframe src="//slides.com/ronakray/t/embed" width="100%" height="100%" scrolling="no" frameBorder="0"
                webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
      </div>

      <div className="center" style={{width: "100%", height:"15vh"}}>
        <br/>
        <button><a href="/auth/google"><img src={googleSignInLogo} alt="alt"/></a></button>
      </div>
    </div>
  );
}
