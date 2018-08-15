const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const connection = require('./config/environment.variable');
const user = require('./routes/user.controller');
const category = require('./routes/category.controller'); 
const product = require('./routes/product.controller');

//Creating the server
const app = express();

//Setting middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//The default get route to check the site running
app.get('/',(req,res,next)=>{
    res.json({status:true, message:'Welcome to Image Gallery'});
});

//Setting sub routes
app.use('/user',user);
app.use('/category',category);
app.use('/product',product);


//Error handling
app.use((error,req,res,next)=>{
    res.json({ status:false, message:'Error: '+ error });
});

//Server is listening
app.listen(connection.port,()=>{
    console.log('Server started at '+ connection.port);
});