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
    from: 'nathaniellind456@outlook.com',
    to: 'finalprojecttest2022@gmail.com',
    subject: `Bookningsförfrågan från: ${req.body.mailerState.email}`,
    text: `
            Namn: ${req.body.mailerState.name}
            Email: ${req.body.mailerState.email}
            Telnr: ${req.body.mailerState.phonenumber}
            Meddelande: ${req.body.mailerState.message}
            Datum: ${req.body.mailerState.startdate} till ${req.body.mailerState.enddate}
            Hyrsaker: ${req.body.mailerState.rentalitems}
          `,
  };

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
