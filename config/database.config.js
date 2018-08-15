//This is the database connection file. The contains the details of the connection to the database.
 
const mongoose = require('mongoose');
const connection = require('./environment.variable');

mongoose.connect('mongodb://'+connection.username+':' +connection.password+'@ds221292.mlab.com:21292/image_gallery', { useNewUrlParser: true } , error =>{
    !error ? console.log('Database connected') : console.log('Error: '+ error);
});

module.exports = mongoose;