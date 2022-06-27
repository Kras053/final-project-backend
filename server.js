require('dotenv').config();

const nodemailer = require("nodemailer");
const app = express();

import express from "express";
import cors from "cors";

const port = process.env.PORT || 8090;

app.use(cors());
app.use(express.json());

let transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})


//Booking form
const createHTMLResponse = (name, email, telnr, message, startdate, enddate, rentalitems) => {

  let things = ""
  rentalitems.map(item => {
    console.log(item)
    things+=`
    <div>
      <p>Namn: ${item.title}</p>
      <p>Antal: ${item.quantity}</p>
      <img src=${item.image}/>
    </div>`
  })

  return (
    `
      <div>
        <h2>Bokningsförfrågan Nordic Spells Decor</h2>
        <p>Namn: ${name}</p>
        <p>Email: ${email}</p>
        <p>Tel: ${telnr}</p>
        <p>Meddelande: ${message}</p>
        <p>Startdatum: ${startdate}</p>
        <p>Slutdatum: ${enddate}</p>

        <p>Hyrsaker: </p>
        ${things}
      </div>
    `
  )
}

app.post("/send2", function (req, res) { 
  
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
    
  };

  console.log(mailOptions)
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
});


//Contact form
app.post("/send", function (req, res) { 

    let mailOptionsContact = {
      from: process.env.EMAIL,
      to: process.env.TOEMAIL,
      subject: `Meddelande från ${req.body.data.email}`,
      text: `
        Namn: ${req.body.data.name}

        Telefonnummer: ${req.body.data.phonenumber}

        Email: ${req.body.data.email}

        Meddelande:
        ${req.body.data.message} 
      `
    }

    transporter.sendMail(mailOptionsContact, function(err, data){
    if (err) {
      console.log('Not working..');
      res.json({
          status: "fail",
      });
    } else {
      console.log('contact form working!');
      res.json({
        status: "success",
    });
    }

    })
});

app.get("/", (req, res) => {
  res.send("Nordic Spells Decor");
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
