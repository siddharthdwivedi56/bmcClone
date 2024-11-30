const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');

const app = express();

/** connecting mongoose with node application */
const dbUrl = "mongodb+srv://siddharthdwivedi56:CKhkWarlzczxqtfN@cluster0.tt6sv.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbUrl).then((connection)=>{
    console.log('db connection done')
}).catch(err => console.log(err));

/** to collect data as json from api request */
app.use(express.json());

/**List of routes */
app.use('/api',userRoute);


app.get('/login',(req,res)=>{
    res.json({"s":123}); 
})

app.listen(8001);