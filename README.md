# Final Project - Nordic Spells Decor website

This was our final project at the Technigo bootcamp. We built a website for the Swedish company Nordic Spells Decor who provides wedding and event decoration services to their customers. 
On the site you can also add rental decoration items to a wishlist and email this to the company together with a form.  

## Project

We started out by doing an extensive project brief and timeplan which we presented to the company and also discussed the different options for a headless CMS to easily change some of the content such as images and products when the project is finished. 

We decided to use the Sanity CMS and spent the first time setting up our Sanity Studio and learning the GROQ query language to fetch the products the customers can add to their wishlist.
Then we created a cart in React Redux to add, remove and store the products selected for the wishlist.
Afterwards we worked on a solution to email this wishlist together with a form where the customer filled in information to the company email, and here we use Nodemailer. 
This and also fetching images in an array for the Flowers section was the hardest part for us, so after finally and happily clearing this we moved on to building the other routes/pages and styling them.  

The images and styling for the website was provided by and made in close dialogue with the company.
The site is responsive for mobile, tablet and desktop with a mobile first approach. 

### What we will continue to work on until website launch:

We will develop the website further according to our clients needs and plan implementing more features like a cookies pop-up, free-consultation pop-up, an accordion with booking terms, UI features like a loader, host the website with a domain service, and also continue to work on the styling. 

We aim to make the site accessable and use semantic HTML and tested it with WAVE and W3 validator.

Cross-browser testing: Crome, Safari, Firefox, Edge.

In Firefox the buttons for the decor rental items are a bit bigger so we will look into this. 

### Tech used in this project:

- Sanity CMS and GROQ
- Node.js
- Express
- Nodemailer
- React
- Redux
- Javascript ES6
- Styled Components 
- React icons
- Elfsight
- Sweetalerts

### View it live

Backend repository: https://github.com/Kras053/final-project-backend

Frontend repository: https://github.com/Kras053/final-project

Heroku deploy: https://final-project-nsd.herokuapp.com/

Website deploy: https://nordicspellsdecor.netlify.app/

