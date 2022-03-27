
import React,{ useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios'
function App() {
  const [booklist, setbooklist] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setbooklist(response.data);
    })
  },[]);

  return (
    <div className="App">
      <h2>booklend</h2>
      
      {booklist.map((val) => {
        return (
          <div>
            <div className="post-container">
              <div className="form">
                <div className="post-item">Account name : {val.name}</div>
                <div className="post-item">Book name : {val.bookname}</div>
                <div className="post-item">Description :{val.review}</div>
                <div className="post-item">Rate: {val.rate}</div>
                <div className="post-item">
                  <img src={process.env.PUBLIC_URL + "/images/" + val.images} />
                </div>
                
                  <button>Borrow</button>
                <hr></hr>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    // </div>
  );
}

export default App;
