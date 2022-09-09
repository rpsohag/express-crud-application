const express = require('express');
const dotenv = require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const IndexPage = require('./routes/pages');
const EmployeeRoute = require('./routes/Employee');
const app = express();
const PORT = process.env.SERVER_PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout', 'layouts/master')
app.use(IndexPage);
app.use('/employee', EmployeeRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})