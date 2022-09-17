const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const expressLayouts = require('express-ejs-layouts');
const userRoute = require('./routes/userRoute');


// Init Express.
const app = express();


// Init EnvironmentVariable.
dotenv.config();
const PORT = process.env.PORT || 4000;


// Static Folder.
app.use(express.static('public'));


// Manage Form and JSON Data.
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// Init EJS.
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/app");


// Connect Router.
app.use('/user', userRoute);


// Create Server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta.black);
});