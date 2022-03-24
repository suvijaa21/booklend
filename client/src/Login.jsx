import React,{ useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios'
function Login(){
  
    const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [loginstatus,setloginstatus]=useState('');
      //  const [userlist, setuserlist] = useState([]);

     const submitform = (e) => {
       console.log("inside log")
       Axios.post("http://localhost:3001/api/getuser", {
         email: email,
         password: password,
       }).then((response)=>{
         if(response.data.message){
           alert(response.data.message)
         }
         else{
           window.location.href = "http://localhost:3000/mypage";
          //  window.location.href = "http://localhost:3000/homepage";
         }
         console.log(response.data);
       });
     };

  //      useEffect(()=>{
  //   Axios.get('http://localhost:3001/api/getuser').then((response)=>{
  //     setuserlist(response.data);
  //   })
  // },[]);
    //   const submitform=()=>
    //   {
    //     userlist.map((val)=>{
    //     console.log(val.email);
    //   if(val.email==email){
    //       if(val.password==password){
    //           window.location.href = "http://localhost:3000/homepage";
    //       }
    //       else
    //       alert("wrong password");
    //   }
    // })
// }

    return(
        <div className='form'>
            <input type="email" name='email' placeholder='email' onChange={(e)=>{
        setemail(e.target.value)
      }}/>
            <input type="password" name="password" placeholder='password' onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
            <button onClick={()=>{
                    submitform();
                    // window.location.href='http://localhost:3000/homepage';
            }}>submit</button>
        </div>
    )
}
export default Login;