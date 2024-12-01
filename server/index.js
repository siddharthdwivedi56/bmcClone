require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');


const app = express();

/** Connecting mongoose with node application */
const dbUrl =  process.env.DB_URI;
mongoose.connect(dbUrl).then((connection)=>{
    console.log('db connection done')
}).catch(err => console.log(err));

/** To collect data as json from api request */
app.use(express.json());

/** List of routes */
app.use('/api',userRoute);
app.listen(8001);