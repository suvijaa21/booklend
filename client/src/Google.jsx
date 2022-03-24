import React, { useState, useEffect } from "react";
import "./App.css";
import {GoogleLogin,GoogleLogout} from "react-google-login";
import Axios from "axios";
function Google(){
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const clientId="736286497437-ltevn02d2am6lrgegrb7rdkueusk1dto.apps.googleusercontent.com";
    const [showloginbutton,setshowloginbutton]=useState(true);
    const [showlogoutbutton,setshowlogoutbutton]=useState(false);
    async function onLoginSuccess(res){
        // console.log(res.profileObj['email'])
        // console.log(res.profileObj["name"]);
        console.log("login success",res.profileObj);
        setname(await res.profileObj["email"]);
        setemail(await res.profileObj["email"]); 
        // console.log(name)
        console.log({email})
        setshowloginbutton(false);
        setshowlogoutbutton(true);
        Axios.post("http://localhost:3001/api/getuser", {
          name: name,
          email: email,
        });
    }
    const onFailureSuccess=(res)=>{
        console.log("unsuccessful login",res);
    }
    const onLogoutSuccess=()=>{
        alert("signed out");
        setshowloginbutton(true);
        setshowlogoutbutton(false);
    }

    return (
      <div>
          {showloginbutton?
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onFailureSuccess}
          cookiePolicy={"single_host_origin"}
        /> :null}
        {showlogoutbutton?
        <GoogleLogout
          clientId="{clientId}"
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        ></GoogleLogout>:null}
      </div>
    );}
export default Google;