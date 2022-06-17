require('dotenv').config();

const nodemailer = require("nodemailer");
const app = express();


import express from "express";
import cors from "cors";
import { request } from "express";

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

const createHTMLResponse = (name, email, telnr, message, startdate, enddate, rentalitems) => {

let things = ""
rentalitems.map(item => {
  console.log(item)
  things+=`
  <div>
  <h2>name: ${item.title}</h2>
  <h2>quantity: ${item.quantity}</h2>
  <img src=${item.image}/>
</div>`
})

  return (
    `
    <div>
    <h1>Booking request</h1>
    <h2>name: ${name}</h2>
    <h2>email: ${email}</h2>
    <h2>telnr: ${telnr}</h2>
    <h2>message: ${message}</h2>
    <h2>date: ${startdate}</h2>
    <h2>date: ${enddate}</h2>

    <h2>rentaltems: </h2>
    ${things}
  </div>
    `
  )

}

//step 2
app.post("/send", function (req, res) { 
  
  // const replacer = (key, value) => {
  //   if (key === products.mainImage) {
  //       console.log(key)
  //     return undefined;
  //   }
  //   return value;
  // }
  //replacer



  const modifiedProducts = []
  req.body.data.products.products.map(singleProduct => {
    console.log(singleProduct)
    modifiedProducts.push({title: singleProduct.title, quantity: singleProduct.quantity, image: singleProduct.mainImage.asset.url})
  })

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TOEMAIL,
    subject: `Bookningsförfrågan från: ${req.body.data.email}`,
    html: createHTMLResponse(req.body.data.name, req.body.data.email, req.body.data.phonenumber,
       req.body.data.message, req.body.data.startdate, req.body.data.enddate, modifiedProducts )
    // text: `
    //         Namn: ${req.body.data.name}
    //         Email: ${req.body.data.email}
    //         Telnr: ${req.body.data.phonenumber}
    //         Meddelande: ${req.body.data.message}
    //         Datum: ${req.body.data.startdate} till ${req.body.data.enddate}
    //         Hyrsaker: ${JSON.stringify(modifiedProducts)} 
    //       `
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
