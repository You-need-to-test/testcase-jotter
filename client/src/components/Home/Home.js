import React from "react";
import googleSignInLogo from '../../img/google_signin_logo.png';
// import LoginPage from './LoginPage'
import {Row, Col} from 'react-materialize'

export default function Home() {
  return (
    <div>
      <Row>
        <Col s={4}>
          {/* <LoginPage/> */}
          <button><a href="/auth/google"><img src={googleSignInLogo} alt="alt"/></a></button>
        </Col>
        <Col s={8}>
          <img src="http://placeimg.com/1085/910/any/grayscale" alt="Smiley face"/>
        </Col>
      </Row>
      {/* <button><a href="/auth/google"><img src={googleSignInLogo} alt="alt"/></a></button> */}
    </div>
  );
}
