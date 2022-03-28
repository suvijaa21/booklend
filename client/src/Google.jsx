import React, { useState, useEffect, Component } from "react";
import "./App.css";
 import FacebookLogin from "react-facebook-login";
 import { Card, Image } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Axios from "axios";
function Google() {
  // fb login
   const [login, setLogin] = useState(false);
   const [data, setData] = useState({});
   const [picture, setPicture] = useState("");

   const responseFacebook = (response) => {
     console.log(response);
     setData(response);
     setPicture(response.picture.data.url);
     // console.log(response.name)
     // console.log(response.email)
     var name = response.name;
     var email = response.email;
     console.log(name);
     console.log(email);
     if (response.accessToken) {
       Axios.post("http://localhost:3001/api/setgoogleuser", {
         name: name,
         email: email,
       }).then((response) => {
         window.location.href = "http://localhost:3000/mypage";
       });
     } else {
       setLogin(false);
     }
   };
  // google login
  const clientId =
    "736286497437-ltevn02d2am6lrgegrb7rdkueusk1dto.apps.googleusercontent.com";
  const [showloginbutton, setshowloginbutton] = useState(true);
  const [showlogoutbutton, setshowlogoutbutton] = useState(false);

  function onLoginSuccess(res) {
    console.log("login success", res.profileObj);
    var username = res.profileObj["name"];
    var email = res.profileObj["email"];
    setshowloginbutton(false);
    setshowlogoutbutton(true);
    Axios.post("http://localhost:3001/api/setgoogleuser", {
      name: username,
      email: email,
    }).then((response) => {
      window.location.href = "http://localhost:3000/mypage";
    });
  }
  const onFailureSuccess = (res) => {
    console.log("unsuccessful login", res);
  };
  const onLogoutSuccess = () => {
    alert("signed out");
    setshowloginbutton(true);
    setshowlogoutbutton(false);
  };

  return (
    <div>
      {/* fb */}
      <div className="container">
        <Card style={{ width: "600px" }}>
          <Card.Header>
            {!login && (
              <FacebookLogin
                appId="449975323586220"
                //   autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            )}
            {login && <Image src={picture} roundedCircle />}
          </Card.Header>
        </Card>
      </div>
      {/* google button */}
      {showloginbutton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onFailureSuccess}
          cookiePolicy={"single_host_origin"}
        />
      ) : null}
      {showlogoutbutton ? (
        <GoogleLogout
          clientId="{clientId}"
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        ></GoogleLogout>
      ) : null}
    </div>
  );
}
export default Google;
