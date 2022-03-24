const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path= require('path')
let session;
// image upload
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "../client/public/images");
  },
  filename:(res,file,cb)=>{
    console.log(file);
    cb(null,Date.now()+path.extname(file.originalname))
  }
}) 
const upload=multer({storage:storage})
app.use(cors());
app.use(express.json());
// database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "smilemeow",
  database: "cruddatabase",

});
// user registration
app.post("/api/registerinsert", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  db.query(
    "INSERT INTO register (name,email,password) VALUES (?,?,?);",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// user login fro google
// app.post("/api/getuser", (req, res) => {
//   console.log("valid1");
//   const email = req.body.email;
//   const name = req.body.name;
//   db.query(
//     "SELECT * FROM register WHERE email=? AND password=?;",
//     [email, password],
//     (err, result) => {
//       if (result.length > 0) {
//         session = result[0].id;
//         res.redirect("http://localhost:3000/homepage");
//         console.log(session);
//         res.send(result);
//       } else {
//         db.query(
//           "INSERT INTO register (name,email) VALUES (?,?);",
//           [name, email],
//           (err, result) => {
//             // db.query("SELECT id FROM register HWERE")
//             // res.redirect("http://localhost:3000/homepage");
//           }
//         );
//         db.query("SELECT id FROM register WHERE email=? AND name=?",[email,name],(err,result)=>{
//           session = result[0].id;
//           res.redirect("http://localhost:3000/homepage");
//           console.log(session);
//           res.send(result);
//         });
        
//       }
//     }
//   );
// });
app.post("/api/getuser", (req, res) => {
  console.log("valid1");
  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM register WHERE email=? AND password=?;",[email,password], (err, result) => {
    if(result.length>0){
      session=result[0].id;
      console.log(session);
      res.send(result);
      
    }
    
  });
});
// get user post
app.get('/api/getmypost',(req,res)=>{
  // console.log(session);
  db.query(
    "SELECT * FROM books WHERE userid=?;",[session],
    (err, result) => {
      if (err) {
        console.log(result);
      } else {
        res.send(result);
      }
    }
  );
})
// get every user post
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM books;", (err, result) => {
    if (err) {
      console.log(result);
    } else {
      res.send(result);
    }
  });
});
// delete a book
app.delete("/api/delete/:bookname", (req, res) => {
  const book = req.params.bookname;
    console.log(book)
  db.query(
    "DELETE FROM books WHERE bookname=?;",
    [book],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// update a book
app.put("/api/update", (req, res) => {
  const bookname = req.body.bookname;
  const rate = req.body.newrate;
  console.log(rate);
  console.log(req.body)
  db.query(
    "UPDATE books SET rate=? WHERE bookname=?",
    [rate,bookname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// upload a book
app.post("/api/insert",upload.single('image'),(req, res) => {
  const bookname = req.body.bookname;
  const description = req.body.description;
  const rate = req.body.rate;
  const classified =req.file.filename;
    console.log(req.body)
    console.log(classified)
  db.query(
    "INSERT INTO books (userid,bookname,review,rate,images) VALUES (?,?,?,?,?);",
    [session,bookname, description,rate,classified],
    (err, result) => {
      res.redirect("http://localhost:3000/homepage");
    }
  );
});

app.listen(3001,()=>{
    console.log('running on port 3001');
});