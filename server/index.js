const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path= require('path')
const Razorpay=require("razorpay");
const crypto=require("crypto");
app.use(cors());
// payment
app.post("/api/orders",(req,res)=>{
  try{
    const instance=new Razorpay({
      key_id:'rzp_test_zNmjxK5Eex46pv',
      key_secret:'UxyXeo8XeomDa9M0va0BQhgg'
    });
    const options={
      amount:req.body.amount*100,
      currency:"INR",
      receipt:crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.status(500).json({message:"something went wrong"});
      }
      res.status(200).json({data:order});
    });
  }

catch(error){
  console.log(error);
  return res.status(200).json({ message: "something went wrong" });
}
}
)
// verify user
app.post("/api/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});
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

app.use(express.json());
// database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "smilemeow",
  database: "cruddatabase",

});
// getmyprofile
app.get("/api/getmyprofile",(req,res)=>{
  db.query(
    "SELECT name FROM register WHERE id=?",
    [session],
    (err, result) => {
      if (result.length > 0) {
        session = result[0].id;
        console.log(session);
        res.send(result);
      }
    }
  );
})
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
app.post("/api/setgoogleuser", (req, res) => {
  console.log("valid1");
  const email = req.body.email;
  const name = req.body.name;
  console.log(email); 
  console.log(name);
  db.query(
    "SELECT * FROM register WHERE email=? AND name=?;",
    [email, name],
    (err, result) => {
      if (result?.length > 0) {
        console.log("inside if")
        session = result[0].id;
        // result.redirect("http://localhost:3000/mypage");
        console.log(session);
        res.send(result);
      }
      else{
         db.query(
           "INSERT INTO register (name,email) VALUES (?,?);",
           [name, email],
           (err, result) => {
             db.query(
               "SELECT id FROM register WHERE email=? AND name=?",
               [email, name],
               (err, result) => {
                session = result[0]?.id;
                // result.redirect("http://localhost:3000/mypage");
                console.log(session);
                res.send(result);
               }
             );
           }
         );
      }
    })
  });
app.post("/api/getuser", (req, res) => {
  console.log("valid1");
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM register WHERE email=? AND password=?;",
    [email, password],
    (err, result) => {
      if (result.length > 0) {
        session = result[0].id;
        console.log(session);
        res.send(result);
      }
    }
  );
});
// get user post
app.get("/api/getmypost", (req, res) => {
  // console.log(session);
  db.query(
    "SELECT * FROM books WHERE userid=? ORDER BY time DESC;",
    [session],
    (err, result) => {
      if (err) {
        console.log(result);
      } else {
        res.send(result);
      }
    }
  );
});
// get every user post
// app.get("/api/getmyprofile",(req,res)=>{
//   db.query
// })
app.get("/api/get", (req, res) => {
  db.query(
    "SELECT register.name,books.* FROM books INNER JOIN register ON books.userid=register.id ORDER BY time DESC;",
    (err, result) => {
      if (err) {
        console.log(result);
      } else {
        res.send(result);
      }
    }
  );
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
  var date = "";
  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  console.log(date)
  db.query(
    "INSERT INTO books (userid,bookname,review,rate,images,time) VALUES (?,?,?,?,?,?);",
    [session,bookname, description,rate,classified,date],
    (err, result) => {
      console.log(date);
      res.redirect("http://localhost:3000/homepage");
    }
  );
});

app.listen(3001,()=>{
    console.log('running on port 3001');
});
