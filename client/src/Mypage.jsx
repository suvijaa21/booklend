import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import classNames from "classnames";
import Edit from "./Edit";
function Mypage() {
  const [bookname, setbookname] = useState("");
  const [description, setdesc] = useState("");
  const [rate, setrate] = useState("");
  const [newrate, setnewrate] = useState("");

  const [booklist, setbooklist] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getmypost").then((response) => {
      setbooklist(response.data);
    });
  }, []);
  const submitreview = (e) => {
    Axios.post("http://localhost:3001/api/insert", {
      bookname: bookname,
      description: description,
      rate: rate,
    });
    // setbooklist([...booklist,{bookname:bookname,review:description,rate:rate,images:URL.createObjectURL(e.target.files[0])}]);
  };
  const deletepost = (book) => {
    Axios.delete(`http://localhost:3001/api/delete/${book}`);
  };
  const updatepost = (book) => {
    console.log(newrate);
    Axios.put("http://localhost:3001/api/update", {
      bookname: book,
      newrate: newrate,
    });
    setnewrate("");
  };
  var username;
  booklist.map((val) => {
    var username = val.name;
  });
  return (
    <div className="App">
      <div className="columns">
        <div>
          <h2>My Page</h2>
          <form
            action="http://localhost:3001/api/insert"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="form">
              <input
                className="post-item"
                type="text"
                name="bookname"
                id=""
                placeholder="Book name"
                onChange={(e) => {
                  setbookname(e.target.value);
                }}
              />

              <input
                className="post-item"
                type="text"
                name="description"
                id=""
                placeholder="Description"
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
              />

              <input
                className="post-item"
                type="number"
                name="rate"
                id=""
                placeholder="Rate"
                onChange={(e) => {
                  setrate(e.target.value);
                }}
              />

              <input
                type="file"
                name="image"
                id=""
                class="custom-file-upload"
              />
              <button onClick={submitreview}>submit</button>
            </div>
          </form>

          {/* getmypost */}

          <h2>MY POSTS</h2>
          {booklist.map((val) => {
            return (
              <div className="form post-container">
                <div className="post-item">Book name : {val.bookname}</div>
                <div className="post-item">Description :{val.review}</div>
                <div className="post-item">Rate: {val.rate}</div>
                <div className="post-item">
                  <img src={process.env.PUBLIC_URL + "/images/" + val.images} />
                </div>
                <div className="flexrow">
                  <button
                    onClick={() => {
                      deletepost(val.bookname);
                      window.location.reload();
                    }}
                  >
                    delete
                  </button>
                  &emsp;&emsp;
                  <button
                    onClick={() => {
//                       <Link
//   to={{
//     pathname: "/page",
//     data: data // your data array of objects
//   }}
// ></Link>
                      // <Edit message="hello"/>
                      // updatepost(val.bookname);
                      window.location.href =
                        `http://localhost:3000/edit`;
                    }}
                  >
                    update
                  </button>
                  <input
                    type="number"
                    name="newrate"
                    id=""
                    onChange={(e) => {
                      setnewrate(e.target.value);
                    }}
                  />
                  <hr></hr>
                </div>
              </div>
            );
          })}
        </div>
        <div className="rightmostcol">
          <div className="form">
            <h3>My profile</h3>
            {/* {userprofile.map((val) => {
                {val.name}
                {val.email}
              })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mypage;
