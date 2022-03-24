import React,{ useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function Register(){
    const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');

  const submitform=()=>{
    
    Axios.post('http://localhost:3001/api/registerinsert',{name:name,email:email,password:password});
};
    return(
        <div className='form'>
            <h3>Sign up</h3>
            <input type="text" name="name" placeholder='name' onChange={(e)=>{
        setname(e.target.value)
      }}/>
            <input type="email" name='email' placeholder='email' onChange={(e)=>{
        setemail(e.target.value)
      }}/>
            <input type="password" name="password" placeholder='password' onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
            <button onClick={()=>{
                    submitform();
                    window.location.href='http://localhost:3000/mypage';
            }}>submit</button>
            <a href="http://localhost:3000/login">Login</a>
        </div>
    )
}
export default Register;