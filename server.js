require('dotenv').config();

const nodemailer = require("nodemailer");
const app = express();


import express from "express";
import cors from "cors";

// const exphbs = require("express-handlebars");

const port = process.env.PORT || 8090;

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//Step 1
let transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

//step 2
app.post("/send", function (req, res) { 
  
  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TOEMAIL,
    subject: `Bookningsförfrågan från: ${req.body.data.email}`,
    text: `
            Namn: ${req.body.data.name}
            Email: ${req.body.data.email}
            Telnr: ${req.body.data.phonenumber}
            Meddelande: ${req.body.data.message}
            Datum: ${req.body.data.startdate} till ${req.body.data.enddate}
            Hyrsaker: ${JSON.stringify(req.body.data.products)}
          `
  };
console.log(mailOptions)
  //step 3
  transporter.sendMail(mailOptions, function(err, data){
    if (err) {
      console.log('Error occurs', err)
      res.json({
        status: "fail",
      });
    } else {
      console.log('Email sent!')
      res.json({
        status: "success",
      });
    }
  });
})



// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
