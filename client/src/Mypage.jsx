import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function Mypage(){
    const [bookname,setbookname]=useState('');
  const [description,setdesc]=useState('');
  const [rate,setrate]=useState('');
  const [newrate,setnewrate]=useState('');
  const [booklist, setbooklist] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/getmypost').then((response)=>{
      setbooklist(response.data);
    })
  },[]);
  const submitreview=(e)=>{
    
    Axios.post('http://localhost:3001/api/insert',{bookname:bookname,description:description,rate:rate});
    setbooklist([...booklist,{bookname:bookname,review:description,rate:rate,images:URL.createObjectURL(e.target.files[0])}]);
};
  const deletepost=(book)=>{
   Axios.delete(`http://localhost:3001/api/delete/${book}`);
  }
  const updatepost=(book)=>{
    console.log(newrate);
     Axios.put('http://localhost:3001/api/update',{bookname:book,newrate:newrate});
     setnewrate('');
  }
  return (
    <div className="App">
      <h2>booklend</h2>
      <form
        action="http://localhost:3001/api/insert"
        method="POST"
        encType="multipart/form-data"
        className="form"
      >
        {/* <div className="form"> */}
        <label htmlFor="">book name</label>
        <input
          type="text"
          name="bookname"
          id=""
          onChange={(e) => {
            setbookname(e.target.value);
          }}
        />
        <label htmlFor="">description</label>
        <input
          type="text"
          name="description"
          id=""
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <label htmlFor="">book rate</label>
        <input
          type="number"
          name="rate"
          id=""
          onChange={(e) => {
            setrate(e.target.value);
          }}
        />

        <input type="file" name="image" id="" />
        <button onClick={submitreview}>submit</button>
      </form>
      {/* getmypost */}
      <h2>MY POSTS</h2>
      {booklist.map((val) => {
        return (
          <div>
            <h1>
              book name:{val.bookname} desc:{val.review} rate:{val.rate}
            </h1>
            <img src={process.env.PUBLIC_URL + "/images/" + val.images} />
            {/* <img src={test} alt="not here" /> */}
            <button
              onClick={() => {
                deletepost(val.bookname);
                window.location.reload();
              }}
            >
              delete
            </button>
            <input
              type="number"
              name="newrate"
              id=""
              onChange={(e) => {
                setnewrate(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updatepost(val.bookname);
                window.location.reload();
              }}
            >
              update
            </button>
          </div>
        );
      })}
    </div>
  );}
export default Mypage;