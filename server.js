require('dotenv').config();

import express from "express";
import cors from "cors";
// const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//Step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

//step 2
let mailOptions = {
  from: 'nodemailertester456@gmail.com',
  to: 'mctestertesty100@gmail.com',
  subject: 'Testing and Testing',
  text: 'IT works'
}

//step 3
transporter.sendMail(mailOptions, function(err, data){
  if (err) {
    console.log('Error Occurs', err)
  
  } else {
    console.log('Email sent!!')
  }
})

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
