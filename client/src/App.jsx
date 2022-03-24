
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
  // const submitreview=(e)=>{
    
  //   Axios.post('http://localhost:3001/api/insert',{bookname:bookname,description:description,rate:rate});
    // setbooklist([...booklist,{bookname:bookname,review:description,rate:rate,images:URL.createObjectURL(e.target.files[0])}]);

  return (
    <div className="App">
      <h2>booklend</h2>
      
      {booklist.map((val) => {
        return (
          <div>
            <h1>
              book name:{val.bookname} desc:{val.review} rate:{val.rate}
            </h1>
            <img src={process.env.PUBLIC_URL + "/images/"+val.images} />
          
          </div>
        );
      })}
    </div>
    // </div>
  );
}

export default App;
